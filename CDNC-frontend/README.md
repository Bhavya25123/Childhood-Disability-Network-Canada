# CDNC - Childhood Disability Network Canada

Welcome to CDNC!

## Project Description

CDNC is a platform dedicated to advocating for children with disabilities. It provides resources, support, and a community for families and professionals involved in childhood disability advocacy.

## How to Run Locally

To run this project on your localhost, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/childhood-disability-advocacy-hub.git
   cd childhood-disability-advocacy-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application running locally.

## Deployed Link

You can access the deployed version of the project at the following link: [CDNC V1](https://cdnc-v1.vercel.app/)

## Advocacy Letter Drafting Experience

The **Send Letter** page is designed to let supporters prepare their own advocacy message before sending it through email, social media, or print. The workflow intentionally stops short of dispatching the message on behalf of the user and instead focuses on producing a polished draft:

1. **Generate an editable draft** – Filling in your name, contact information, and optional personal story allows the app to stitch those details into the base template. The generated text is placed in an editable textarea so you can keep tailoring the copy by hand.
2. **Copy the draft anywhere** – The **Copy draft** button reads the current textarea contents (including any manual edits) and writes them to the clipboard, making it easy to paste into your preferred messaging channel.
3. **Reset to the starting template** – If you want to begin again, the **Reset template** action restores the original guidance text without reloading the page.

These controls work together to keep the experience flexible: you can iterate on the text as much as you like, copy the latest version, and always have a quick way to jump back to the default template.
