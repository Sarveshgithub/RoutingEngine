
import { LightningElement, track } from 'lwc';

export default class Re_teamDetail extends LightningElement {

    @track currentContent = 'tutorial';
    @track tutorialValue = false;
    @track integrationValue = false;
    @track visualforceValue = false;
    @track triggerValue = false;
    @track jqueryJavascriptValue = false;
    @track salesforceLwcValue = false;


    changeHandleAction(event) {
        const selected = event.detail.name;

        this.currentContent = selected;

        if (selected == 'tutorial') {
            this.tutorialValue = true;
        } else {
            this.tutorialValue = false;
        }

        if (selected == 'integration') {
            this.integrationValue = true;
        } else {
            this.integrationValue = false;
        }

        if (selected == 'visualforce') {
            this.visualforceValue = true;
        } else {
            this.visualforceValue = false;
        }

        if (selected == 'trigger') {
            this.triggerValue = true;
        } else {
            this.triggerValue = false;
        }

        if (selected == 'jqueryJavascript') {
            this.jqueryJavascriptValue = true;
        } else {
            this.jqueryJavascriptValue = false;
        }

        if (selected == 'salesforceLwc') {
            this.salesforceLwcValue = true;
        } else {
            this.salesforceLwcValue = false;
        }

    }
}