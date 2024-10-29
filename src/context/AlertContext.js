import React, { createContext } from 'react';
import Swal from 'sweetalert2';

const AlertContext = createContext();

const AlertProvider = (props) => {
    // Function to show SweetAlert
    const toastMixin = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    // Function to show success alert
    const alertSuccess = (successMsg) => {
        toastMixin.fire({
            icon: 'success',
            title: successMsg
        });
    };

    // Function to show error alert
    const alertFailure = (failureMsg) => {
        toastMixin.fire({
            icon: 'error',
            title: failureMsg
        });
    };

    const confirmAction = (text, confirmText) => {
        return Swal.fire({
            title: "Are You Sure?",
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: "No, stay here!",
            confirmButtonColor: '#28A745',
            cancelButtonColor: '#DC3545',
        });
    };

    return (
        <AlertContext.Provider value={{ alertSuccess, alertFailure, confirmAction }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export { AlertContext, AlertProvider };