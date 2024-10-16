"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  getEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDB } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDB();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDB();

    const event = await Event.findById(eventId)
      .populate({
        path: "organizer",
        model: User,
        select: "_id firstName lastName",
      })
      .populate({
        path: "category",
        model: Category,
        select: "_id  name",
      });
    if (!event) {
      console.log("Event not found");
      return;
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDB();

    const conditions = {};

    const eventQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

    const events = await eventQuery
      .populate({
        path: "organizer",
        model: User,
        select: "_id firstName lastName",
      })
      .populate({
        path: "category",
        model: Category,
        select: "_id  name",
      });
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDB();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) {
      revalidatePath(path);
    }

    if (!deletedEvent) {
      console.log("Event not found");

      return;
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const updateEvent = async ({
  path,
  userId,
  event,
}: UpdateEventParams) => {
  try {
    await connectToDB();

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getRelatedEventsByCategory = async ({
  categoryId,
  limit = 3,
  page = 1,
  eventId,
}: GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDB();
    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await eventsQuery
      .populate({
        path: "organizer",
        model: User,
        select: "_id firstName lastName",
      })
      .populate({
        path: "category",
        model: Category,
        select: "_id  name",
      });
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getEventsByUser = async ({
  userId,
  page,
  limit = 6,
}: getEventsByUserParams) => {
  try {
    await connectToDB();
    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsOrganized = await Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "organizer",
        model: User,
        select: "_id firstName lastName",
      })
      .populate({
        path: "category",
        model: Category,
        select: "_id  name",
      });
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(eventsOrganized)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
