import { View, Text, FlatList, TouchableOpacityBase, TouchableOpacity, ImageBackground, Image, ViewToken } from "react-native"
import React, { useState } from "react"
import { VideoCollection } from "@/models/video"
import * as Animatable from "react-native-animatable"
import { icons } from "@/constants"
import { Video, ResizeMode, AVPlaybackStatusSuccess } from "expo-av"

interface TrendingItemProps {
  activeItem: VideoCollection;
  item: VideoCollection;
}

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false)
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.id === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {
        play ? <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />

            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain" />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}


type TrendingProps = {
  posts: VideoCollection[];
}

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0]);


  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        />
      )}
      keyExtractor={item => item.id.toString()}
      horizontal
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActiveItem(viewableItems[0].item)
        }
      }}
      contentOffset={{ x: 150 }}

      viewabilityConfig={
        {
          itemVisiblePercentThreshold: 70
        }
      }
    />
  )
}

export default Trending
