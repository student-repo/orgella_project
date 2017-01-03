export const registerStatus = (status) => {
    console.log("You changed register status: ", status);
    return {
        type: 'REGISTER_STATUS',
        payload: status
    }
};
