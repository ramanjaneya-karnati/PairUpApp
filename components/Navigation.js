// @flow
import * as React from "react";
import {type NavigationNavigatorProps, type NavigationScreenProp} from "react-navigation";

export type NavigationProps<P: {} = {}> = NavigationNavigatorProps<{}, { params: P, index: number }>;
export type OptionalNavigationProps = {
    navigation?: NavigationScreenProp<*>
};

export const StackNavigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

export const animationEnabled = true;
