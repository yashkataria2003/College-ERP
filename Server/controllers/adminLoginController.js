import dotenv from 'dotenv'

dotenv.config()
export const checkAuthentication = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( email.toString() === process.env.VITE_ADMIN_EMAIL.toString() ) {
            if (password.toString() === process.env.VITE_ADMIN_PASSWORD.toString()) {
                return res.status(200).json({ success: true, data: {name: "Admin"}, message: `Admin logged in successfully` });
            }

            else {
                return res.status(400).json({ success: false, message: "Incorrect Password" });
            }
        }

        else {
            return res.status(400).json({ success: false, message: "Wrong Admin Email" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
