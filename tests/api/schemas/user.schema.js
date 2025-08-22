import { Validator } from 'jsonschema';

const userSchema = {
    id: '/user',
    type: 'object',
    properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        avatar: { type: 'string' }
    },
    required: ['id', 'email', 'first_name', 'last_name'],
    additionalProperties: false
};

const usersArraySchema = {
    id: '/users',
    type: 'array',
    items: { $ref: '/user' }
};

function validateUserSchema(json) {
    const v = new Validator();
    v.addSchema(userSchema, '/user');
    return v.validate(json, userSchema).errors;
}

function validateUsersArraySchema(json) {
    const v = new Validator();
    v.addSchema(userSchema, '/user');        
    v.addSchema(usersArraySchema, '/users');
    return v.validate(json, usersArraySchema).errors;
}

// Schema for POST /users response
const createUserResponseSchema = {
    id: '/createUserResponse',
    type: 'object',
    properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },  // ReqRes returns string ID for created users
        createdAt: { type: 'string' }
    },
    required: ['name', 'job', 'id', 'createdAt'],
    additionalProperties: false
};

function validateCreateUserResponseSchema(json) {
    const v = new Validator();
    v.addSchema(createUserResponseSchema, '/createUserResponse');
    return v.validate(json, createUserResponseSchema).errors;
}

export {
    validateUserSchema,
    validateUsersArraySchema,
    validateCreateUserResponseSchema
};