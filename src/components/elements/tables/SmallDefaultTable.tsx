"use client"
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const SmallDefaultTable = () => {
    return (
        <div className="inventual-common-card mb-5">
            <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr className='bg-lightest'>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Social Media</td>
                            <td>Lorem, ipsum dolor.</td>
                            <td>
                                <div className="inventual-list-action-style">
                                    <PopupState variant="popover">
                                        {(popupState:any) => (
                                            <React.Fragment>
                                                <button className='' type='button' {...bindTrigger(popupState)}>
                                                    Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                                </button>
                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i> Edit</MenuItem>
                                                    <MenuItem onClick={popupState.close}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
                                                </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Online</td>
                            <td>Lorem, ipsum dolor.</td>
                            <td>
                                <div className="inventual-list-action-style">
                                    <PopupState variant="popover">
                                        {(popupState:any) => (
                                            <React.Fragment>
                                                <button className='' type='button' {...bindTrigger(popupState)}>
                                                    Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                                </button>
                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i> Edit</MenuItem>
                                                    <MenuItem onClick={popupState.close}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
                                                </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SmallDefaultTable;