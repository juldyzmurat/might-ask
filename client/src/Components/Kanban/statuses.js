export const statuses = [
  "draft",
  "to_review",
  "to_be_fixed",
  "to_publish",
  "published",
];

export const statusNames = {
  draft: "Draft",
  to_review: "To Review",
  to_be_fixed: "To Be Fixed",
  to_publish: "To Publish",
  published: "Published",
};

export const getPostsByStatus = (unorderedPosts) => {
  const postsByStatus = unorderedPosts.reduce(
    (acc, post) => {
      acc[post.status].push(post);
      return acc;
    },
    statuses.reduce((obj, status) => ({ ...obj, [status]: [] }), {}),
  );
  // order each column by index
  statuses.forEach((status) => {
    postsByStatus[status] = postsByStatus[status].sort(
      (recordA, recordB) => recordA.index - recordB.index,
    );
  });
  return postsByStatus;
};
