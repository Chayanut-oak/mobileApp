import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
        />
    );
};
export default CustomHeaderButton;