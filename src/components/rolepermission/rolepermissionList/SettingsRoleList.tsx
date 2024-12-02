import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const SettingsRoleList = () => {

    const [childCheckboxStates, setChildCheckboxStates] = useState({

        // first row
        createSMS: true,
        systemSetting: true,
        mailSettings: true,
        currencySetting: true,
        language: true,

        // second row
        sendNotification: true,
        backupDatabase: true,
        sendMail: true,
        posSetting: true,
        timeDate: true,

        // third row
        sendSMS: true,
        mailCreate: true,
        smsSetting: true,
        newsletterSetting: true,
        createRole: true,

    });
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        // Check if all child checkboxes are checked, if yes, set parent checkbox to checked
        const allChecked = Object.values(childCheckboxStates).every(value => value);
        setSelectAllChecked(allChecked);
    }, [childCheckboxStates]);

    const handleChildCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setChildCheckboxStates(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSelectAllChange = (event: any) => {
        const isChecked = event.target.checked;
        setSelectAllChecked(isChecked);
        setChildCheckboxStates({

            // first row
            createSMS: isChecked,
            systemSetting: isChecked,
            mailSettings: isChecked,
            currencySetting: isChecked,
            language: isChecked,

            // second row
            sendNotification: isChecked,
            backupDatabase: isChecked,
            sendMail: isChecked,
            posSetting: isChecked,
            timeDate: isChecked,

            // third row
            sendSMS: isChecked,
            mailCreate: isChecked,
            smsSetting: isChecked,
            newsletterSetting: isChecked,
            createRole: isChecked,

        });
    };

    return (
        <>
            <div className="inventual-role-list border-b border-solid border-gray-borderThree flex items-center">
                <div className="inventual-role-left">
                    <div className="inventual-role-topic">
                        <h5 className="text-[18px] font-semibold text-heading mb-4">Settings</h5>
                        <div className='inventual-checkbox-style ms-3'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectAllChecked}
                                        onChange={handleSelectAllChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label="Permission All"
                            />
                        </div>
                    </div>
                </div>
                <div className="inventual-role-right w-full border-s border-solid border-gray-borderThree">
                    <div className="inventual-role-category-list custom-height-50 flex items-center">
                        <div className="inventual-role-checkbox-wrapper inventual-role-checkbox-wrapper2">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.createSMS}
                                            onChange={handleChildCheckboxChange}
                                            name="createSMS"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Create SMS"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.systemSetting}
                                            onChange={handleChildCheckboxChange}
                                            name="systemSetting"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="System Setting"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.mailSettings}
                                            onChange={handleChildCheckboxChange}
                                            name="mailSettings"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Mail Settings"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.currencySetting}
                                            onChange={handleChildCheckboxChange}
                                            name="currencySetting"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Currency Setting"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.language}
                                            onChange={handleChildCheckboxChange}
                                            name="language"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Language"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-50 flex items-center">
                        <div className="inventual-role-checkbox-wrapper inventual-role-checkbox-wrapper2">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.sendNotification}
                                            onChange={handleChildCheckboxChange}
                                            name="sendNotification"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Send Notification"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.backupDatabase}
                                            onChange={handleChildCheckboxChange}
                                            name="backupDatabase"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Backup Database"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.sendMail}
                                            onChange={handleChildCheckboxChange}
                                            name="sendMail"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Send Mail"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.posSetting}
                                            onChange={handleChildCheckboxChange}
                                            name="posSetting"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="POS Setting"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.timeDate}
                                            onChange={handleChildCheckboxChange}
                                            name="timeDate"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Time & Date"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-50 flex items-center">
                        <div className="inventual-role-checkbox-wrapper inventual-role-checkbox-wrapper2">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.sendSMS}
                                            onChange={handleChildCheckboxChange}
                                            name="sendSMS"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Send SMS"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.mailCreate}
                                            onChange={handleChildCheckboxChange}
                                            name="mailCreate"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Mail Create"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.smsSetting}
                                            onChange={handleChildCheckboxChange}
                                            name="smsSetting"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="SMS Setting"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.newsletterSetting}
                                            onChange={handleChildCheckboxChange}
                                            name="newsletterSetting"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Newsletter Setting"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.createRole}
                                            onChange={handleChildCheckboxChange}
                                            name="createRole"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Create Role"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsRoleList;