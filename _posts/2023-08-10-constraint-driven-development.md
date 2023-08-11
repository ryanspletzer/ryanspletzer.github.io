---
layout: post
title: Constraint Driven Development
date: 2023-08-10 00:00:00
description: >
  In the last few systems and services I've designed for cloud, I've taken an approach of starting with the limits and
  working backwards.
tags:
 - constraints
 - limits
---

In the last few systems and services I've designed for cloud, I've taken an approach of starting with the limits and
working backwards.

Every cloud has limits, like the published
[service quotas for AWS](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) and
[Azure subscription and service limits, quotas, and constraints](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits).

In the early systems you design and develop for cloud, it's easy to not take these limits into account.

If you're lucky, maybe you never manage to hit one of them.

However, I have been unlucky before and hit several, and in those moments you find yourself in a tangled architecture
with strange "workarounds" that you wouldn't have had to do otherwise had you designed with those limits in mind in the
first place.

To draw one example: I distinctly remember hitting a limit with the max Azure CosmosDB document size of 2MB, and doing
workarounds like dropping some unnecessary properties and compressing some others to stay within that limit.

From these experiences, I've taken an approach to diagram out and think through all the different cloud resources that
will be involved in a solution, and then I make a table somewhat like the following:

| Item            | Notes                     |
| --------------- | ------------------------- |
| ResourceName1   | - Bulleted List of Limits |
| ResourceName2   | - Bulleted List of Limits |
| ResourceName3   | - Bulleted List of Limits |

For each limit in the list of limits for a given resource, I review it and think, "Given this design, will I ever
realistically hit this limit?"

If the answer to that question is "Yes," then it's a sign that your design needs change to account for that.

There are also limits that apply to Infrastructure-as-Code itself, too, like the max size of a CloudFormation template
or Bicep template, so beyond just thinking through resource limits, also think through the limits of your IaC itself to
create those resources.
