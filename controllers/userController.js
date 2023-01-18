const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const { promisify } = require('util');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const createUserToken = require('../utils/createAccessToken')
