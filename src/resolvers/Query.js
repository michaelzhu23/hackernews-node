function feed(parent, args, context, info) {
  return context.prisma.link.findMany();
}

function link(parent, args, context, info) {
  return context.prisma.link.findOne({
    where: { id: parseFloat(args.id) },
  });
}

module.exports = {
  feed,
  link,
};
