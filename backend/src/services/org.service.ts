import { resolve } from "path";
import Org from "../models/org.model";

const createOrg = (key: string, name: string, admin: string) =>
    new Promise((resolve, reject) => {
        Org.create({
            key,
            name,
            admin,
        })
            .then((data) => {
                if (data) {
                    resolve(data._id);
                } else {
                    throw new Error("Org Creation Failed");
                }
            })
            .catch((err) => reject(err));
    });

const isKeyAvailable = (key: string) =>
    new Promise((resolve, reject) => {
        Org.findOne({
            key,
        })
            .then((data) => {
                if (!data) {
                    resolve(true);
                } else {
                    reject("Key already used");
                }
            })
            .catch((err) => reject(err));
    });

const listOrgs = (adminId: string) =>
    Org.find({
        admin: adminId,
    })
    .select("key name");

export default {
    createOrg,
    isKeyAvailable,
    listOrgs
};
