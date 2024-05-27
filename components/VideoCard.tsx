import { View, Text, Image, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { VideoCollection } from "@/models/video"
import { icons } from "@/constants"
import { Video, ResizeMode, AVPlaybackStatusSuccess } from "expo-av"

interface VideoCardProps {
  video: VideoCollection
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3">
            <Text className="text-sm text-white font-psemibold" numberOfLines={1}>
              {video.title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {video.creator.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain" />
        </View>
      </View>
      {play ? <Video
        source={{ uri: video.video }}
        className="w-full h-60 rounded-xl mt-3"
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status: AVPlaybackStatusSuccess) => {
          if (status.didJustFinish) {
            setPlay(false)
          }
        }}
      /> : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
