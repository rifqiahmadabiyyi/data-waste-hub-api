const { User, Departement } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const validateRequest = require('../middlewares/validateRequest');

const SECRET_KEY = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// Register User
exports.register = [
    validateRequest(registerSchema),
    async (req, res) => {
        const { username, password, departement_id } = req.body;
        try {
        const departement = await Departement.findByPk(departement_id);
        if (!departement) return errorResponse(res, 'Invalid departement_id', 4001, {}, 400);

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.create({ username, password: hashedPassword, departement_id });

        return successResponse(res, 'User registered successfully', newUser, 201);
        } catch (error) {
        // return res.status(500).json({ success: false, message: error.message });
        return errorResponse(res, 'Internal Server Error', 4001, {}, 500);
        }
    }
];

// exports.login = [ 
//     validateRequest(loginSchema),
//     async (req, res) => {
//     const { username, password } = req.body;
  
//     if (!username || !password) {
//       return errorResponse(res, 'Username and password are required', 4001, {}, 400);
//     }
  
//     const user = await User.scope('withPassword').findOne({ where: { username } });
  
//     if (!user) {
//       return errorResponse(res, 'User not found', 1003, {}, 404);
//     }
  
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return errorResponse(res, 'Incorrect password', 4001, {}, 401)
//     }
  
//     const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '2h' });

//     return successResponse(res, 'Login successful', token, 200);
//   }
// ];

exports.login = [ 
  validateRequest(loginSchema),
  async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return errorResponse(res, 'Username and password are required', 4001, {}, 400);
    }
  
    // Cari user dengan username yang diberikan
    const user = await User.scope('withPassword').findOne({
      where: { username },
      include: [
        {
          model: Departement,
          as: 'departement',
          attributes: ['id'], // Ambil hanya departement_id
        },
      ],
    });
  
    if (!user) {
      return errorResponse(res, 'User not found', 1003, {}, 404);
    }
  
    // Validasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Incorrect password', 4001, {}, 401);
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '2h' });

    // Kirim response dengan username dan departement_id
    return successResponse(res, 'Login successful', {
      token: token,
      username: user.username,
      departement_id: user.departement?.id || null,
    }, 200);
  },
];

