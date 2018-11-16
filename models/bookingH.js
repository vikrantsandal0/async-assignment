module.exports = {

    userSchema: () => {

        dba.createCollection("userCollection", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",

                    required: ["email"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        access_token: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        email: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        password: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        phoneNumber: {
                            bsonType: "string",
                            description: "must be a srting and is required"
                        },
                        createdAt: {
                            bsonType: "string",
                            description: "must be a srting and is required"
                        }
                    }
                }
            },
            validationLevel: 'moderate',
            validationAction: 'error'
        })




    }




}












