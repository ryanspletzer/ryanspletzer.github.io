---
layout: post
title: How to Get Your client_id and client_secret from Entra ID
date: 2025-01-09 00:00:00
description: >
  Since I am not a scalable replacement for ChatGPT or Google, and because I felt this would be helpful beyond my own
  company, I felt compelled to write this post due to the sheer volume of questions I get on an almost daily basis about
  how to get a client_id and client_secret for an app registration from Entra ID (formerly known as Azure AD).

tags:
 - entra-id
 - app-registration
 - oauth
---

Since I am not a scalable replacement for ChatGPT or Google, and because I felt this would be helpful beyond my own
company, I felt compelled to write this post due to the sheer volume of questions I get on an almost daily basis about
how to get a client_id and client_secret for an app registration from Entra ID (formerly known as Azure AD).

Microsoft has changed the UI over the years to include things like a "Secret ID" next to secret values, and also has
other GUID identifiers in the mix in the form of tenant id's and object id's, which can be confusing for people when
they go to the Azure Portal to retrieve these values for an app registration they are using for a specific use case.

While there are guides out there on Microsoft Learn that describe how to do this, people often do not find those, so I
find that it is helpful to describe how to do this in my own words.

## Caveats

These steps assume that there is an app registration waiting for you in the Azure Portal that you own.

(Many/most enterprises are likely restrict who can create these, for good security reasons, so one would likely be
created for you upon request to your admins.)

## Steps

Here are the steps, illustrated with my test tenant:

1. Navigate to the Azure Portal at portal.azure.com and sign in with your company identity.
2. Search for "App registrations" in the search box at the top and click on the icon with the grid and the
   three-dimensional looking cube:
  ![App registrations logo in the top search bar on the Azure Portal](/assets/images/app_registrations_search_bar.png)

3. Go to the "Owned applications" tab:
  ![The Owned Applications tab in the Azure Portal App registrations view](/assets/images/OwnedApplicationsAzurePortal.png)

4. Filter / select your desired app registration.
5. On the "Overview" tab, your client_id is in the "Application (client) ID" -- it is _NOT_ the "Object id" or the
   "Directory (tenant) id". (I'm belaboring this point because this is where a lot of people get tripped up.)
  ![Showing the client_id on an app registration](/assets/images/client_id.png)

6. On the "Certificates & secrets" tab, you can generate a client_secret by clicking the "New client secret" button:
  ![Showing the New client secret button on an app registration](/assets/images/new-client-secret.png)

7. Once you've generated the new client_secret, the client_secret _value_ is in the "Value" column -- it is _NOT_ the
   "Secret ID." Also the "Secret ID" is _NOT_ your client_id. The "Secret ID" is not used at all in authentication
   flows. (I'm belaboring this point because this is where a lot of people get tripped up.) Also, _importantly_, this
   client_secret is only shown _once_, so if you navigate away or close this page, you cannot get it back -- be sure to
   capture it in a safe, company-approved place like a password manager for safe-keeping and later reference. (If you do
   close or navigate away from this page, when you come back, only the first three letters of the client_secret will be
   shown -- this is to allow you to correlate which client_secret value goes with which listed client_secret in the
   portal.) Don't worry, I deleted this client_secret shortly after I generated it, but in general, you should not share
   these client_secrets with anyone besides the developers that need to use it (and I encourage developers to use their
   own client_secret for local development purposes versus sharing a client_secret):
  ![Showing a generated client_secret on an app registration](/assets/images/client_secret.png)

I may revisit this blog post to amend it to make it as clear as I can in the case that the instructions are not enough
to get someone through this process, or in the event that Microsoft changes the UI for this.

Once you have a client_id and client_secret, you can use those to get short-lived JWT access_tokens, for use in calling
API's that utilize Entra ID authorization -- calling the Entra ID token endpoint to issue those tokens will be the
subject of a future blog post, because many people struggle with this, too!
