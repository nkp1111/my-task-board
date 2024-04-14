export const getUserFormattedData = (user: any) => {
  return {
    _id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    status: user.status,
  }
}