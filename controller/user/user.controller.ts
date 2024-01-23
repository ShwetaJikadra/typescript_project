import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserServices from '../../services/userServices'; 
import * as jwt from 'jsonwebtoken'
import { IUser } from '../../Interface/userInterface';
import UserCollection from '../../schema/userSchema';
import * as randomstring from 'randomstring'
import { sendResetPasswordMail } from '../../helper/sendResetPasswordMail';
const userServices = new UserServices();

declare module 'express' {
  interface Request {
    user?: IUser; 
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { fname, lname, gender, phone, email, password, role, profileImage } = req.body;

    let user = await userServices.getUser({ email: email });

    if (user) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await userServices.addNewUser({
      fname: fname,
      lname: lname,
      gender: gender,
      phone: phone,
      email: email,
      password: hashPassword,
      role: role,
    });

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();

    res.status(501).json({ message: "Signup success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await userServices.getUser({ email, isDelete: false });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const checkPassword: boolean = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const payload = {
      userId: user._id,
    };

    const token: string = jwt.sign(payload, process.env.SECRET_KEY || '');

    return res.status(200).json({ token, message: 'Login success' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const userProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    
    if (req.user) {
     
      let user = await userServices.getUser({ _id: req.user._id });

      if (user) {
        res.json({ UserProfile: user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cur_pass, new_pass, con_pass } = req.body;

    // Check if req.user is defined
    if (req.user && req.user._id) {
      // Check if current password matches the user's stored password
      const userPassword = req.user.password;

      const checkpass: boolean = await bcrypt.compare(cur_pass, userPassword);

      if (!checkpass) {
        res.status(401).json({ message: 'Current password is incorrect' });
        return;
      }

      // Check if new password and confirm password match
      if (new_pass !== con_pass) {
        res.status(400).json({ message: 'New password and confirm password do not match' });
        return;
      }

      // Hash the new password
      const hashPassword: string = await bcrypt.hash(new_pass, 10);

      // Update the user's password in the database
      const updatedUser = await userServices.updateUser(req.user._id, {
        $set: { password: hashPassword },
      });

      if (updatedUser) {
        res.json({ message: 'Password reset success', new_pass });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated or user ID not available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if req.user is defined
    if (req.user && req.user._id) {
      const user = await UserCollection.findByIdAndUpdate(
        req.user._id,
        { $set: { ...req.body } },
        { new: true }
      );

      if (user) {
        res.status(200).json({ user, message: 'User is Updated' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated or user ID not available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server Error' });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if req.user is defined
    if (req.user && req.user._id) {
      const user = await userServices.updateUser(
        req.user._id,
        { $set: { isDelete: true } },
      
      );

      if (user) {
        res.status(200).json({ user, message: 'User is Updated' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(401).json({ message: 'User not authenticated or user ID not available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server Error' });
  }
};

export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await UserCollection.findOne({ email: email });

    if (user) {
      const randomString = randomstring.generate();
      const data = await userServices.updateUser(email, { $set: { resetToken: randomString } });

      // Assuming there's a function sendResetPasswordMail defined somewhere
      sendResetPasswordMail(user.fname, user.email, randomString);

      res.status(200).json({ message: 'Reset token generated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfileImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?._id;

    if (!req.file) {
      return res.status(400).json({ message: 'No profile image provided' });
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated or user ID not available' });
    }

    const newProfileImage = req.file.filename;

    const user = await userServices.updateUser(
      userId,
      { $set: { profileImage: newProfileImage } }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'Profile image updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const signOut = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = jwt.sign({ userId: req.user?._id }, process.env.SECRET_KEY || '', { expiresIn: '5s' });

    console.log('User signed out');
    return res.status(200).json({ message: 'User signed out successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};