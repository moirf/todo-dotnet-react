// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * The 'Config' component is used to display your group tabs
 * user configuration options.  Here you will allow the user to 
 * make their choices and once they are done you will need to validate
 * their choices and communicate that to Teams to enable the save button.
 */
export const TabConfig = () => {
    /**
     * When the user clicks "Save", save the url for your configured tab.
     * This allows for the addition of query string parameters based on
     * the settings selected by the user.
     */
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {

        const baseUrl = `https://todo-app-1234.azurewebsites.net`;
        microsoftTeams.settings.setSettings({
            "suggestedDisplayName": "Task Board",
            "entityId": "Test",
            "contentUrl": baseUrl + "/home",
            "websiteUrl": baseUrl + "/home"
        });
        saveEvent.notifySuccess();
    });

    /**
     * After verifying that the settings for your tab are correctly
     * filled in by the user you need to set the state of the dialog
     * to be valid.  This will enable the save button in the configuration
     * dialog.
     */
    microsoftTeams.settings.setValidityState(true);

    return (
        <div className="large-root">
            <h1>Add Task Board</h1>
            <div>
                Select <b>Save</b> to add our organization's task board to this workspace.
          </div>
        </div>
    );
}
