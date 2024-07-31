import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    if (!channelId) {
        throw new ApiError(400, "Invalid channel id")
    }

    const alreadySubscribed = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user?._id
    })

    if(alreadySubscribed){
        await alreadySubscribed.deleteOne()
        return res.
        status(200).
        json(
            new ApiResponse(200, {}, "Subscription Removed Successfully")
        )
    }

    const createSubscription = await Subscription.create({
        channel: channelId,
        subscriber: req.user?._id
    })
    if (!subscribed) {
        throw new ApiError(500, "Subscribtion failed")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, createSubscription, "Congratulation! You have Successfully Subscribed this channel")
    )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if(!channelId){
        throw new ApiError(400,"Invalid channel id")
    }

    const subscribers = await Subscription.find({channel: channelId}).populate("subscriber", "fullName email username avatar coverImage");


    return res
    .status(200)
    .json(new ApiResponse(200,{subscribers},"Subscribers are fetched successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Invalid subscriber id")
    }

    const subscribedChannels = await Subscription
    .find({subscriber: subscriberId})
    .populate("channel", "fullName email username avatar coverImage");

    return res
    .status(200)
    .json(
        new ApiResponse(200,{subscribedChannels},"Subscribers are fetched successfully")
    )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}