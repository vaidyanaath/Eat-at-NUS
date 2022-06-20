import React from 'react';

import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import { colors } from '../../assets/colors';

// import auth
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

const handleProfileButton = () => {
    console.log("profile button pressed!");
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signed out");
    }).catch((error) => {
        console.log(error);
    });
}

export const ProfileButton = ({ source }) => (
    <TouchableOpacity onPress={handleProfileButton} backgroundColor={colors.black} style={styles.profilePic}>
        <Image 
            style={styles.profilePic} 
            source={source}
        />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 20,
    }
})
