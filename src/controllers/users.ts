import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);

    return res.status(200).json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(403).json({ msg: "username is required!" });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.sendStatus(403).json({ msg: "user is not found!" });
    }

    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
