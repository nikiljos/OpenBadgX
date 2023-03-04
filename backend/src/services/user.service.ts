import User from "../models/user.model";

const userDetail = (id: string) =>
    User.findById(id).select("name email profileImage");

export default {
    userDetail,
};
