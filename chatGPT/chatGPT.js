import { LightningElement } from "lwc";
import getQueryData from "@salesforce/apex/ChatGptHandler.getQueryData";

export default class ChatGPT extends LightningElement {
  serachResults = [];
  searchTerm = "";
  searchTerm2 = "";
  responseData;

  handleChange(event) {
    this.searchTerm = event.target.value;
  }

  handleChange2(event) {
    this.searchTerm2 = event.target.value;
  }

  handleClick() {
    getQueryData({
      searchString: this.searchTerm,
      instruction: this.searchTerm2
    }).then((result) => {
      console.log(result);
      let response = JSON.parse(result);
      console.log(response);
      if (response.error) {
        this.responseData = response.error.message;
        console.log(this.responseData);
      } else if (response.choices[0].text) {
        this.responseData = response.choices[0].text;
        this.responseData = this.responseData.replace(/\n/g, "<br />");
        console.log(this.responseData);
      }
    });
  }
}
