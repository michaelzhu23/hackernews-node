const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context, info) => {
      return context.prisma.link.findMany();
    },
    link: async (parent, args, context, info) => {
      return context.prisma.link.findOne({
        where: { id: parseFloat(args.id) },
      });
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    updateLink: (parent, args, context, info) => {
      return context.prisma.link.update({
        where: { id: parseFloat(args.id) },
        data: {
          description: args.description,
          url: args.url,
        },
      });
    },
    deleteLink: (parent, args, context, info) => {
      return context.prisma.link.delete({
        where: { id: parseFloat(args.id) },
      });
    },
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
