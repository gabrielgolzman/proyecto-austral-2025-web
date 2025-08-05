export const multiColourStyles = {
    option: (styles, { isFocused }) => {

        return {
            ...styles,
            backgroundColor: isFocused ? "#7ACE5EFF" : "#FFFFFF",
            color: isFocused ? "blue" : "#000000"

        };
    },

};

export const initialForm = {
    title: '',
    authors: [],
    rating: '',
    pageAmount: '',
    imageUrl: '',
    isAvailable: '',
    summary: ''
}