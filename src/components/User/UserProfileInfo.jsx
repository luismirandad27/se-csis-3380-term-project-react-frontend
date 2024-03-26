import React, { useEffect, useState } from "react";

const UserProfileInfoComponent = ({userInfo}) => {
    
    return (
        <>
            <div className="pt-20 px-40 pb-20 md:mx-auto bg-gray-50">
                <div className="bg-white w-full rounded-lg shadow-xl pl-10 pr-10">
                    <div className="flex items-center px-4 sm:px-0 pt-5">
                        <img src={userInfo.logo_image_url} alt="User Image" className="h-16 w-146 object-cover mr-4 rounded-full" />
                        <div>
                            <h3 className="text-xl font-semibold leading-7 text-gray-900">{userInfo.company}</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo.username}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo.email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo.address}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userInfo.phone}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Joined</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(userInfo.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfileInfoComponent;