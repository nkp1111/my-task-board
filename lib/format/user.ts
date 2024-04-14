export const getUserFormattedData = (user: any) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    email: user.email,
  }
}