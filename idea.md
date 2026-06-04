Finance Club IIT Bombay Website
Final Instruction Document for Development
1. Objective

This website will serve as the central digital platform of Finance Club IIT Bombay.

The website should function as:

the main hub for Finance Club activities

a platform for hosting competitions

a place for students to access finance resources

a website that showcases the club to sponsors and industry professionals

The website should be clean, modern, easy to navigate, and easy for future managers to edit.

Primary focus areas:

Hosting competitions

Presenting the club to sponsors and industry

Providing resources and blogs for students

2. Target Users

Primary users:

IIT Bombay students

Sponsors / companies / industry speakers

Secondary users:

Alumni

External students participating in competitions

3. Design Requirements

The design must follow these principles:

Style:

Dark theme

Modern UI

Minimal and clean

Easy navigation

Visual tone:

fintech style

professional

modern startup aesthetic

The website must be:

mobile responsive

fast loading

visually appealing

4. Website Pages

The website must contain the following main pages:

Home
About
Competitions
Resources
Blogs
Team
Sponsors
Announcements
Contact

The navigation bar should remain visible across pages.

5. Homepage Structure

The homepage should communicate the club’s credibility and activity.

Sections:

Hero Section

Finance Club IIT Bombay
Short tagline about finance education and competitions.

Buttons:

View Competitions

Explore Resources

What We Do

Short overview of:

competitions

sessions

bootcamps

guides

Featured Competitions

Display currently active competitions.

Each card should include:

competition name

short description

deadline

button to view competition

Featured Resources

Display important guides and materials.

Examples:

finance guides

research material

winning submissions

Latest Blogs

Show previews of the latest blog posts.

Sponsor Section

Display logos of collaborating companies.

Footer

Include:

email

social media

LinkedIn

contact information

6. About Page

Explain the club.

Sections:

introduction to Finance Club

what the club does

areas of finance explored

opportunities for students

7. Competitions Page

This page is one of the most important parts of the website.

It should list all competitions.

Each competition must have a dedicated page.

8. Competition Page Structure

Each competition page must contain:

Competition Overview

Description of the competition.

Timeline

Example:

Registration Opens
Submission Deadline
Results Announcement

Rules

Competition rules and instructions.

Team Formation

Competitions may allow team participation.

Team registration fields:

team name

member names

member emails

Registration Form

Fields required:

Name

Email

Team name

Member names

Submission Section

Participants must be able to upload files.

Accepted formats:

PDF
PPT
PPTX
ZIP
Code files

Maximum file size: 50 MB

Submission fields:

team name

submission file

optional comments

Submission Deadline

Submissions must automatically close after the deadline.

Submission Confirmation

After successful submission show a popup on the website.

Popup text:

Title

Submission Successful

Message

Your submission has been recorded successfully.

Button

Close

No email confirmation is required.

9. Resources Page

The resources page provides learning material.

Content types allowed:

downloadable PDFs

external links

videos

example competition submissions

The page must include a search bar.

Users should be able to search resources easily.

10. Blogs Page

The blog section contains articles written by club members.

Each blog should include:

title

author

date

article content

optional images

Managers must be able to edit or create blog posts easily.

11. Team Page

Display the current team. - Managers and Conveners

Each member card must contain:

photo

name

role

phone number

email

LinkedIn

No biography required.

12. Sponsors Page

This page is designed to showcase the club to companies.

Sections:

Previous Collaborations

Display logos of companies that collaborated with the club.

Partner With Us

Short explanation of how companies can collaborate with Finance Club.

Contact for Partnership

Display manager contact details.

13. Announcements Page

Managers should be able to post announcements.

Examples:

competition launches

guide releases

session announcements

club updates

14. Contact Page

Show contact details.

Include:

manager email

phone number

LinkedIn

social media

15. Admin Editing Requirements

Managers must be able to edit content without coding.

They should be able to:

add competitions

edit competitions

upload resources

publish blogs

update team members

post announcements

All of this should be editable through the backend.

16. Technical Stack (Final)

The website should use the following stack.

Frontend

Next.js
React
TailwindCSS
Shadcn UI components

Backend / Database

Supabase
(PostgreSQL database)

Hosting

Vercel (free hosting)
17. File Storage

Competition submissions should not be stored in the database.

Files must be uploaded to Google Drive.

Architecture:

User uploads file
→ file stored in Google Drive folder
→ Drive link saved in database
18. Google Drive Folder Structure
Finance Club Website
    Competitions
        ERC
        FinSearch
    Resources
        Guides
        Winning Submissions
19. Registration Data Backup

All form submissions must also be saved to Google Sheets.

Workflow:

User submits form
→ store data in Supabase database
→ append row to Google Sheet

This ensures that the club never loses submission data.

20. Google Sheet Structure

Example columns:

Timestamp
Competition Name
Team Name
Member 1
Member 2
Member 3
Email
Submission Link
Comments
21. System Scalability

The system must support:

up to 10,000 users

external participants

heavy submission traffic during deadlines

22. File Upload Rules

Allowed file types:

PDF
PPT
PPTX
ZIP
Code files

Maximum file size:

50 MB
23. Performance Requirements

The website must be:

mobile responsive

fast loading

stable during competition deadlines

24. Final System Architecture
Frontend → Next.js

Database → Supabase

File Storage → Google Drive

Registration Backup → Google Sheets

Hosting → Vercel
25. Development Priority

Features must be implemented in this order:

Homepage

Competition system

File submission system

Google Drive upload

Google Sheets backup

Resources page

Blog system

Team page

Sponsors page

Announcements