const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {},

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { username, email }, context) => {
      if (context.username)
        return await User.findOneAndDelete({ username, email });
    },
  },
};
