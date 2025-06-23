import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AiOutlineUpload } from 'react-icons/ai';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import imageCompression from 'browser-image-compression';


dayjs.extend(customParseFormat);

const departmentMap = {
    cse: "Computer Science & Engineering",
    swe: "Software Engineering",
    arc: "Architecture",
    civil: "Civil Engineering",
    ipe: "Industrial & Production Engineering",
    chemical: "Chemical Engineering"
};

export default function AdmissionForm() {
    const { slug } = useParams();
    const department = departmentMap[slug];

    const { register, handleSubmit, formState: { errors }, setError, setValue, watch } = useForm();

    // State to track first error field key
    const [firstErrorKey, setFirstErrorKey] = useState(null);

    const [formStatus, setFormStatus] = useState('');

    // List your fields in the order they appear in the form
    const fieldOrder = [
        'fullName',
        'email',
        'dobDay',
        'dobMonth',
        'dobYear',
        'gender',
        'nationality',
        'phone',
        'presentAddress',
        'sscBoard',
        'sscYear',
        'sscGPA',
        'hscBoard',
        'hscYear',
        'hscGPA',
        'fatherName',
        'fatherPhone',
        'motherName',
        'motherPhone',
        'photo',
        'signature',
        'declaration',
    ];

    // Update firstErrorKey whenever errors change
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setFirstErrorKey(null);
            return;
        }
        const firstKey = fieldOrder.find((key) => errors[key]);
        setFirstErrorKey(firstKey || null);
    }, [errors]);


    const onSubmit = async (data) => {
        console.log(data)
        const day = data.dobDay.padStart(2, '0');
        const month = data.dobMonth.padStart(2, '0');
        const year = data.dobYear;
        const dobRaw = `${day}-${month}-${year}`;
        const parsedDOB = dayjs(dobRaw, 'DD-MM-YYYY', true);

        if (!parsedDOB.isValid()) {
            setError('dobDay', { message: 'Please enter a valid date.' });
            return;
        }

        data.dob = parsedDOB.format('DD-MMM-YYYY');
        delete data.dobDay;
        delete data.dobMonth;
        delete data.dobYear;

        const formData = new FormData();

        const imageOptions = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 300,
            useWebWorker: true,
            fileType: 'image/jpeg',
        };

        for (let key in data) {
            if (data[key] instanceof FileList && data[key].length > 0) {
                let file = data[key][0];
                if (key === 'photo' || key === 'signature') {
                    try {
                        // Compress and resize image on the frontend
                        const compressedFile = await imageCompression(file, imageOptions);
                        formData.append(key, compressedFile);
                        console.log(`${key} compressed:`, compressedFile);
                        const objectURL = URL.createObjectURL(compressedFile);
                        const img = new Image();

                        img.onload = () => {
                            console.log(`${key} - Final size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
                            console.log(`${key} - Final dimensions: ${img.width}x${img.height}`);
                            console.log(`${key} - Format: ${compressedFile.type}`);
                        };

                        img.src = objectURL;
                    } catch (error) {
                        console.error(`${key} compression failed:`, error);
                        formData.append(key, file); // fallback original file
                    }
                }
            } else {
                formData.append(key, data[key]);
            }
        }
        setFormStatus('Form submitted successfully!');


    };
    const fieldFocusMap = {
        photo: 'photo-button',
        signature: 'signature-button',
    };
    const onError = () => {
        if (Object.keys(errors).length === 0) {
            return;
        }
        const firstKey = fieldOrder.find((key) => errors[key]);
        ///setFirstErrorKey(firstKey || null);
        const targetId = fieldFocusMap[firstKey] ? fieldFocusMap[firstKey] : firstKey;
        if (firstKey === 'photo') console.log("photo te vul")
        if (firstKey === 'signature') console.log("signature e vul")
        console.log(firstKey)
        const el = document.getElementById(targetId);
        if (el) el.focus();
    }

    return (
        <div className="w-full max-w-5xl mx-auto mt-10 mb-16 p-4 sm:p-6 bg-white shadow-lg rounded-lg overflow-hidden border border-blue-700 ring-1 ring-blue-700/10">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6 text-sm" aria-label="Admission Form">
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-5 rounded-t-md shadow">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* University Branding */}
                        <div className="flex items-center gap-4">
                            <img
                                src="/sust-logo.png"
                                alt="University Logo"
                                className="w-12 h-12 rounded-md bg-white p-1"
                            />
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold leading-tight">
                                    Shahjalal University of Science & Technology
                                </h1>
                                <p className="text-sm sm:text-base opacity-90">
                                    {department} Admission Form
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* ========== PERSONAL INFO ========== */}
                <fieldset>
                    <legend className="text-base font-semibold mb-2">Personal Information</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="fullName" className="block font-medium mb-1">
                                Full Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                {...register('fullName', { required: 'Full name is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.fullName}
                                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                            />
                            {errors.fullName && (
                                <p
                                    id="fullName-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'fullName' ? 'alert' : undefined}
                                >
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: 'Email is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                            />
                            {errors.email && (
                                <p
                                    id="email-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'email' ? 'alert' : undefined}
                                >
                                    {errors.email.message}
                                </p>
                            )}
                        </div>


                        {/* Date of Birth */}
                        <div className="relative">
                            <label htmlFor="dobDay" className="block font-medium mb-1">
                                Date of Birth <span className="text-red-600">*</span>
                            </label>

                            <div className="flex items-center gap-1">
                                {/* Day */}
                                <input
                                    type="text"
                                    id="dobDay"
                                    inputMode="numeric"
                                    maxLength="2"
                                    placeholder="DD"
                                    aria-label="Day"
                                    aria-required="true"
                                    aria-invalid={!!errors.dobDay}
                                    aria-describedby={errors.dobDay ? 'dobDay-error' : 'dob-desc'}
                                    {...register('dobDay', {
                                        required: 'Day is required',
                                        pattern: {
                                            value: /^(0?[1-9]|[12][0-9]|3[01])$/,
                                            message: 'Day must be 1–31',
                                        },
                                    })}
                                    className="w-12 text-center px-2 py-1 border rounded-sm"
                                />

                                <span className="text-gray-700">/</span>

                                {/* Month */}
                                <input
                                    type="text"
                                    id="dobMonth"
                                    inputMode="numeric"
                                    maxLength="2"
                                    placeholder="MM"
                                    aria-label="Month"
                                    aria-required="true"
                                    aria-invalid={!!errors.dobMonth}
                                    aria-describedby={errors.dobMonth ? 'dobMonth-error' : 'dob-desc'}
                                    {...register('dobMonth', {
                                        required: 'Month is required',
                                        pattern: {
                                            value: /^(0?[1-9]|1[012])$/,
                                            message: 'Month must be 1–12',
                                        },
                                    })}
                                    className="w-12 text-center px-2 py-1 border rounded-sm"
                                />

                                <span className="text-gray-700">/</span>

                                {/* Year */}
                                <input
                                    type="text"
                                    id="dobYear"
                                    inputMode="numeric"
                                    maxLength="4"
                                    placeholder="YYYY"
                                    aria-label="Year"
                                    aria-required="true"
                                    aria-invalid={!!errors.dobYear}
                                    aria-describedby={errors.dobYear ? 'dobYear-error' : 'dob-desc'}
                                    {...register('dobYear', {
                                        required: 'Year is required',
                                        pattern: {
                                            value: /^\d{4}$/,
                                            message: 'Year must be 4 digits',
                                        },
                                        validate: (value) => {
                                            const year = parseInt(value);
                                            return (
                                                (year >= 1900 && year <= new Date().getFullYear()) ||
                                                'Invalid year'
                                            );
                                        },
                                    })}
                                    className="w-16 text-center px-2 py-1 border rounded-sm"
                                />
                            </div>

                            {/* Description */}
                            <p id="dob-desc" className="text-xs text-gray-500 mt-1">
                                Format: DD/MM/YYYY (e.g., 04/06/2001)
                            </p>

                            {/* Error messages */}
                            {errors.dobDay && (
                                <p
                                    id="dobDay-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'dobDay' ? 'alert' : undefined}
                                >
                                    {errors.dobDay.message}
                                </p>
                            )}
                            {errors.dobMonth && (
                                <p
                                    id="dobMonth-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'dobMonth' ? 'alert' : undefined}
                                >
                                    {errors.dobMonth.message}
                                </p>
                            )}
                            {errors.dobYear && (
                                <p
                                    id="dobYear-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'dobYear' ? 'alert' : undefined}
                                >
                                    {errors.dobYear.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <p id="gender-group-label" className="block font-medium mb-1">
                                Gender <span className="text-red-600">*</span>
                            </p>

                            <div className="flex flex-col gap-2" role="radiogroup" aria-labelledby="gender-group-label">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="gender-male"
                                        value="male"
                                        {...register('gender', { required: 'Gender is required.' })}
                                        aria-invalid={!!errors.gender}
                                        aria-describedby={errors.gender ? 'gender-error' : undefined}
                                        name="gender"
                                    />
                                    <label htmlFor="gender-male" className="text-sm">Male</label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="gender-female"
                                        value="female"
                                        {...register('gender', { required: 'Gender is required.' })}
                                        aria-invalid={!!errors.gender}
                                        aria-describedby={errors.gender ? 'gender-error' : undefined}
                                        name="gender"
                                    />
                                    <label htmlFor="gender-female" className="text-sm">Female</label>
                                </div>
                            </div>

                            {errors.gender && (
                                <p
                                    id="gender-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'gender' ? 'alert' : undefined}
                                >
                                    {errors.gender.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="nationality" className="block font-medium mb-1">
                                Nationality <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="nationality"
                                type="text"
                                {...register('nationality', { required: 'Nationality is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.nationality}
                                aria-describedby={errors.nationality ? 'nationality-error' : undefined}
                            />
                            {errors.nationality && (
                                <p
                                    id="nationality-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'nationality' ? 'alert' : undefined}
                                >
                                    {errors.nationality.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block font-medium mb-1">
                                Phone Number <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                {...register('phone', {
                                    required: 'Phone number is required.',
                                    pattern: {
                                        value: /^(\+?88)?01[3-9]\d{8}$/,
                                        message: 'Invalid phone number.'
                                    }
                                }
                                )}

                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? 'phone-error' : undefined}
                            />
                            {errors.phone && (
                                <p
                                    id="phone-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'phone' ? 'alert' : undefined}
                                >
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>


                        {/* Address */}
                        <div className="sm:col-span-2">
                            <label htmlFor="presentAddress" className="block font-medium mb-1">
                                Address <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="presentAddress"
                                rows="2"
                                {...register('presentAddress', { required: 'Present address is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.presentAddress}
                                aria-describedby={errors.presentAddress ? 'presentAddress-error' : undefined}
                            />
                            {errors.presentAddress && (
                                <p
                                    id="presentAddress-error"
                                    className="text-red-600 text-sm mt-1"
                                    role={firstErrorKey === 'presentAddress' ? 'alert' : undefined}
                                >
                                    {errors.presentAddress.message}
                                </p>
                            )}
                        </div>

                    </div>
                </fieldset>

                {/* ========== ACADEMIC INFO ========== */}
                <fieldset>
                    <legend className="text-base font-semibold mt-6 mb-2">Academic Information</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="sscBoard" className="block font-medium mb-1">
                                SSC Board <span className="text-red-600">*</span>
                            </label>
                            <select
                                id="sscBoard"
                                {...register('sscBoard', { required: 'SSC Board is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.sscBoard}
                                aria-describedby={errors.sscBoard ? 'sscBoard-error' : undefined}
                            >
                                <option value="">Select Board</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="rajshahi">Rajshahi</option>
                                <option value="comilla">Comilla</option>
                                <option value="barisal">Barisal</option>
                                <option value="chittagong">Chittagong</option>
                                <option value="sylhet">Sylhet</option>
                                <option value="dinajpur">Dinajpur</option>
                                <option value="mymensingh">Mymensingh</option>
                                <option value="madrasah">Madrasah</option>
                                <option value="technical">Technical</option>
                            </select>
                            {errors.sscBoard && (
                                <p id="sscBoard-error" role={firstErrorKey === 'sscBoard' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.sscBoard.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="sscYear" className="block font-medium mb-1">
                                SSC Passing Year <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="sscYear"
                                inputMode="numeric"
                                maxLength="4"
                                placeholder="YYYY"
                                {...register('sscYear', {
                                    required: 'SSC Year is required.', pattern: {
                                        value: /^\d{4}$/,
                                        message: 'Year must be 4 digits',
                                    }, validate: (value) => {
                                        const year = parseInt(value);
                                        return (
                                            (year >= 1900 && year <= new Date().getFullYear()) ||
                                            'Invalid year'
                                        );
                                    },
                                })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.sscYear}
                                aria-describedby={errors.sscYear ? 'sscYear-error' : undefined}
                            />
                            {errors.sscYear && (
                                <p id="sscYear-error" role={firstErrorKey === 'sscYear' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.sscYear.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="sscGPA" className="block font-medium mb-1">
                                SSC GPA <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="sscGPA"
                                type="text"
                                {...register('sscGPA', { required: 'SSC GPA is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.sscGPA}
                                aria-describedby={errors.sscGPA ? 'sscGPA-error' : undefined}
                            />
                            {errors.sscGPA && (
                                <p id="sscGPA-error" role={firstErrorKey === 'sscGPA' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.sscGPA.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="hscBoard" className="block font-medium mb-1">
                                HSC Board <span className="text-red-600">*</span>
                            </label>
                            <select
                                id="hscBoard"
                                {...register('hscBoard', { required: 'HSC Board is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.hscBoard}
                                aria-describedby={errors.hscBoard ? 'hscBoard-error' : undefined}
                            >
                                <option value="">Select Board</option>
                                <option value="dhaka">Dhaka</option>
                                <option value="rajshahi">Rajshahi</option>
                                <option value="comilla">Comilla</option>
                                <option value="barisal">Barisal</option>
                                <option value="chittagong">Chittagong</option>
                                <option value="sylhet">Sylhet</option>
                                <option value="dinajpur">Dinajpur</option>
                                <option value="mymensingh">Mymensingh</option>
                                <option value="madrasah">Madrasah</option>
                                <option value="technical">Technical</option>
                            </select>
                            {errors.hscBoard && (
                                <p id="hscBoard-error" role={firstErrorKey === 'hscBoard' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.hscBoard.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="hscYear" className="block font-medium mb-1">
                                HSC Passing Year <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="hscYear"
                                inputMode="numeric"
                                maxLength="4"
                                placeholder="YYYY"
                                {...register('hscYear', {
                                    required: 'HSC Year is required.', pattern: {
                                        value: /^\d{4}$/,
                                        message: 'Year must be 4 digits',
                                    }, validate: (value) => {
                                        const year = parseInt(value);
                                        return (
                                            (year >= 1900 && year <= new Date().getFullYear()) ||
                                            'Invalid year'
                                        );
                                    },
                                })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.hscYear}
                                aria-describedby={errors.hscYear ? 'hscYear-error' : undefined}
                            />
                            {errors.hscYear && (
                                <p id="hscYear-error" role={firstErrorKey === 'hscYear' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.hscYear.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="hscGPA" className="block font-medium mb-1">
                                HSC GPA <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="hscGPA"
                                type="text"
                                {...register('hscGPA', { required: 'HSC GPA is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.hscGPA}
                                aria-describedby={errors.hscGPA ? 'hscGPA-error' : undefined}
                            />
                            {errors.hscGPA && (
                                <p id="hscGPA-error" role={firstErrorKey === 'hscGPA' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.hscGPA.message}
                                </p>
                            )}
                        </div>
                    </div>
                </fieldset>


                {/* ========== GUARDIAN INFO ========== */}
                <fieldset>
                    <legend className="text-base font-semibold mt-6 mb-2">Guardian Information</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="fatherName" className="block font-medium mb-1">
                                Father’s Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="fatherName"
                                type="text"
                                {...register('fatherName', { required: 'Father’s Name is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.fatherName}
                                aria-describedby={errors.fatherName ? 'fatherName-error' : undefined}
                            />
                            {errors.fatherName && (
                                <p id="fatherName-error" role={firstErrorKey === 'fatherName' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.fatherName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="fatherPhone" className="block font-medium mb-1">
                                Father’s Phone <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="fatherPhone"
                                type="tel"
                                {...register('fatherPhone', { required: 'Father’s Phone is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.fatherPhone}
                                aria-describedby={errors.fatherPhone ? 'fatherPhone-error' : undefined}
                            />
                            {errors.fatherPhone && (
                                <p id="fatherPhone-error" role={firstErrorKey === 'fatherPhone' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.fatherPhone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="motherName" className="block font-medium mb-1">
                                Mother’s Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="motherName"
                                type="text"
                                {...register('motherName', { required: 'Mother’s Name is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.motherName}
                                aria-describedby={errors.motherName ? 'motherName-error' : undefined}
                            />
                            {errors.motherName && (
                                <p id="motherName-error" role={firstErrorKey === 'motherName' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.motherName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="motherPhone" className="block font-medium mb-1">
                                Mother’s Phone <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="motherPhone"
                                type="tel"
                                {...register('motherPhone', { required: 'Mother’s Phone is required.' })}
                                className="w-full px-2 py-1 border rounded-sm"
                                aria-required="true"
                                aria-invalid={!!errors.motherPhone}
                                aria-describedby={errors.motherPhone ? 'motherPhone-error' : undefined}
                            />
                            {errors.motherPhone && (
                                <p id="motherPhone-error" role={firstErrorKey === 'motherPhone' ? 'alert' : undefined} className="text-red-600 text-sm mt-1">
                                    {errors.motherPhone.message}
                                </p>
                            )}
                        </div>
                    </div>
                </fieldset>


                <fieldset>
                    <legend className="text-base font-semibold mt-6 mb-2">Document Upload</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {/* Passport Photo */}
                        <div>
                            <label htmlFor="photo-button" className="block font-medium mb-1">
                                Passport Photo <span className="text-red-600">*</span>
                            </label>
                            <p id="photo-desc" className="text-sm text-gray-500 mb-1">
                                Accepted: JPG/PNG · Max: 100KB · Size: 300x300px
                            </p>

                            <button
                                type="button"
                                id="photo-button" // ID used for focusing on error
                                onClick={() => document.getElementById('photo').click()}
                                className="flex items-center justify-center px-3 py-2 border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                                aria-label="Upload passport photo"
                                aria-describedby="photo-desc"
                            >
                                <AiOutlineUpload className="mr-2" />
                                {watch('photo')?.[0]?.name || 'Upload Photo'}
                            </button>

                            <input
                                id="photo"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                {...register('photo', { required: 'Photo is required.' })}
                                className="hidden"
                                aria-required="true"
                                aria-invalid={!!errors.photo}
                            />

                            {watch('photo')?.[0] && (
                                <>
                                    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                                        Photo uploaded: {watch('photo')[0].name}
                                    </div>
                                    <img
                                        src={URL.createObjectURL(watch('photo')[0])}
                                        alt="Uploaded passport photo preview"
                                        className="mt-2 border rounded max-w-[150px] max-h-[150px]"
                                    />
                                </>
                            )}
                            {errors.photo && (
                                <p id="photo-error" role="alert" className="text-red-600 text-sm mt-1">
                                    {errors.photo.message}
                                </p>
                            )}
                        </div>

                        {/* Signature */}
                        <div>
                            <label htmlFor="signature-button" className="block font-medium mb-1">
                                Digital Signature <span className="text-red-600">*</span>
                            </label>
                            <p id="signature-desc" className="text-sm text-gray-500 mb-1">
                                Accepted: JPG/PNG · Max: 100KB · Size: 300x80px
                            </p>

                            <button
                                type="button"
                                id="signature-button"
                                onClick={() => document.getElementById('signature').click()}
                                className="flex items-center justify-center px-3 py-2 border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                                aria-label="Upload digital signature"
                                aria-describedby="signature-desc"
                            >
                                <AiOutlineUpload className="mr-2" />
                                {watch('signature')?.[0]?.name || 'Upload Signature'}
                            </button>

                            <input
                                id="signature"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                {...register('signature', { required: 'Signature is required.' })}
                                className="hidden"
                                aria-required="true"
                                aria-invalid={!!errors.signature}
                            />

                            {watch('signature')?.[0] && (
                                <>
                                    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                                        Signature uploaded: {watch('signature')[0].name}
                                    </div>
                                    <img
                                        src={URL.createObjectURL(watch('signature')[0])}
                                        alt="Uploaded signature preview"
                                        className="mt-2 border rounded max-w-[150px] max-h-[80px]"
                                    />
                                </>
                            )}

                            {errors.signature && (
                                <p id="signature-error" role="alert" className="text-red-600 text-sm mt-1">
                                    {errors.signature.message}
                                </p>
                            )}
                        </div>
                    </div>
                </fieldset>



                {/* ========== DECLARATION & SUBMIT ========== */}
                <fieldset>
                    <legend className="text-base font-semibold mt-6 mb-2">Declaration</legend>
                    <label className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            {...register('declaration', { required: 'You must accept the declaration to submit.' })}
                            className="mt-1"
                            aria-required="true"
                            aria-invalid={!!errors.declaration}
                            aria-describedby={errors.declaration ? 'declaration-error' : undefined}
                        />
                        <span>
                            I hereby declare that the information provided is true and accurate. I understand that any misinformation may lead to disqualification.
                        </span>
                    </label>
                    {errors.declaration && (
                        <p id="declaration-error" role="alert" className="text-red-600 text-sm mt-1">
                            {errors.declaration.message}
                        </p>
                    )}
                </fieldset>


                <div className="pt-4">
                    <button
                        type="submit"
                        className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 focus:outline-none"
                    >
                        Submit Application
                    </button>
                </div>
                {formStatus && (
                    <div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className="mt-4 text-green-700 bg-green-100 px-4 py-2 rounded"
                    >
                        {formStatus}
                    </div>
                )}

            </form>
        </div>
    );
}
