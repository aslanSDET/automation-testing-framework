import { Validator } from 'jsonschema';

const userSchema = {
    type: 'object',
    required: ['id', 'name', 'email', 'gender', 'status'],
    properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string', enum: ['male', 'female', 'other'] },
        status: { type: 'string', enum: ['active', 'inactive'] }
    }
};

const usersArraySchema = {
    id: '/users',
    type: 'array',
    items: {
        $ref: '/user'
    }
};

const errorSchema = {
    type: 'object',
    required: ['message'],
    properties: {
        message: { type: 'string' }
    }
}

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

function validateErrorSchema(json) {
    const v = new Validator();
    v.addSchema(errorSchema, '/error');
    return v.validate(json, errorSchema).errors;
}

export {
    validateUserSchema,
    validateUsersArraySchema,
    validateErrorSchema
};