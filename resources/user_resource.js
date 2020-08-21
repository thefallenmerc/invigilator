const Resource = require('./resource');

module.exports = class UserResource extends Resource {

    format(resource) {
        return {
            id: resource.id,
            name: resource.name,
            email: resource.email,
            token: resource.token,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt
        };
    }

}