const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      for (let i = 0; i < links.length; i++) {
        if (args.id === links[i].id) {
          return links[i];
        }
      }
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      for (let i = 0; i < links.length; i++) {
        if (args.id === links[i].id) {
          links[i].description = args.description;
          links[i].url = args.url;
          return links[i];
        }
      }
    },
    deleteLink: (parent, args) => {
      const deleteIndex = links.findIndex((link) => link.id === args.id);
      if (deleteIndex === -1) {
        throw new Error("Link does not exist!");
      }
      const linkDeleted = links.splice(deleteIndex, 1);
      return linkDeleted[0];
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
