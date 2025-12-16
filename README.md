# Sun's FIX Decoder

A browser-based visualization tool for parsing Financial Information eXchange (FIX) protocol logs. 

**Live Demo:** [https://sunotech.github.io/fix-decoder/](https://sunotech.github.io/fix-decoder/)

## 🚀 Overview

Investigating production issues in high-frequency trading often involves scanning thousands of lines of raw FIX logs. This tool parses raw FIX messages and reconstructs the conversation flow into a readable, tabular format. 

It is designed for Support Engineers, Developers, and QA testers who need to visualize complex Algo orders or standard DMA flows quickly.

![Dashboard Preview](./public/img/screenshot.png)

## ✨ Key Features

* **Conversation Reconstruction:** Automatically aligns Sender and Receiver messages to visualize the flow.
* **Custom Tags Support:** Define custom FIX tags (e.g., for specific OMS/EMS vendors or Algo strategies) to decode non-standard fields.
* **In-Place Search:** Filter logs by OrderID, ClOrdID, or specific tag values instantly.
* **Privacy Focused:** **100% Client-Side.** No log data is ever sent to a server. All parsing happens locally in your browser to ensure trading data confidentiality.
* **Multiple delimiters supported**: Different FIX engines use different delimiters, this tool supports 6 different delimiters. 

| Delimiter     | Description                  | Status |
|---------------|------------------------------|--------|
| \x01 / \u0001 | SOH (official FIX delimiter) | ✅     |
| \|            | Pipe                         | ✅     |
| ;             | Semicolon                    | ✅     |
| ^             | Caret                        | ✅     |
| ^A            | Text representation of SOH   | ✅     |
| \t            | Tab                          | ✅     |

*   **Validation**: It checks checksums for you, so you know if a message is corrupted.
*   **Dark Mode**: More people prefer dark mode while I don't use it personally, please try and share your feedback.


## 🛠️ Usage

1.  Open the [Live Tool](https://sunotech.github.io/fix-decoder/).
2.  Paste your raw FIX log content into the input area.
3.  (Optional) upload a custom dictionary if you are using proprietary tags.
4.  View the parsed table below.

## 💻 Running Locally

If you prefer to host this within your internal network:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/sunotech/fix-decoder.git](https://github.com/sunotech/fix-decoder.git)
    ```
2.  Open `index.html` in any modern web browser.

## ⚖️ License & Credits

* **License:** GPL-3.0
* **Credits:** This project is a fork and enhancement of the excellent work by [Drew Noakes](https://github.com/drewnoakes/fix-decoder).

---
*Created by Sun Yong. Open for contributions and suggestions.*
