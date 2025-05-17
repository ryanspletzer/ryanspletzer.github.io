---
layout: page
title: Linkfarm
permalink: /linkfarm/
---

## Software Engineering and Technology

These are what I believe to be important and seminal works that I refer to often. Presented in roughly the order I've
read them:

* [Design Patterns](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) - This is a
  foundational read, and though there are some patterns from this book that are dated, many stand the test of time.

* [Scalable and Modular Architecture for CSS](https://smacss.com/) - I searched high and low for patterns for CSS.
  There's pretty good prescriptive guidance when it comes to most programming languages, but when it came to a logical
  organization pattern for stylesheets, I wandered in the desert for a long time -- until I found this book. I have yet
  to find a better approach.

* [Smashing Books](https://shop.smashingmagazine.com/collections/books):
  [1](https://shop.smashingmagazine.com/products/the-smashing-book-1-digital-edition),
  [2](https://shop.smashingmagazine.com/products/smashing-book-2),
  [3 + 3 1/3](https://shop.smashingmagazine.com/products/smashing-book-3-digital-edition),
  [4](https://shop.smashingmagazine.com/products/smashing-book-4-ebooks),
  [5](https://shop.smashingmagazine.com/products/smashing-book-5-real-life-responsive-web-design),
  and [more](https://shop.smashingmagazine.com/) - These books have come out at certain intervals over the years, and
  although I don't claim to be a Designer of any sort, much of what I do know about web design started with these series
  of books. Smashing Magazine has also produced other non-numbered books on more specific subjects which are also great.

* [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) - Frontend
  development has changed a lot over the years, but this book first introduced me to some fundamental concepts including
  the important AMD pattern.

* [Microsoft Visual C# Step by Step, 9th Edition](https://www.microsoftpressstore.com/store/microsoft-visual-c-sharp-step-by-step-9781509307760) - I read an earlier
  edition of this book, but you'll want to get the latest available. It's not exactly an earth-shattering book, but I
  decided to retroactively add it to the list, as in hindsight it is a very good book to give to as an introductory book
  to the C# language for someone who has not used it before.

* [C# Coding Conventions (C# Programming Guide)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions) - Important
  conventions for C#.

* [Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/) - Dovetailing off
  of C# conventions is overall conventions for library design in conjunction with the .NET Framework.

* [Adaptive Code: Agile coding with design patterns and SOLID principles (2nd Edition) (Developer Best Practices)](https://www.amazon.com/Adaptive-Code-principles-Developer-Practices/dp/1509302581/) - The SOLID principles are well
  explained this book, and it goes into good depth on the essential concept of Dependency Injection.

* [Microsoft .NET - Architecting Applications for the Enterprise (2nd Edition) (Developer Reference)](
  https://www.amazon.com/Microsoft-NET-Architecting-Applications-Enterprise/dp/0735685355) - After reading Adaptive
  Code, I recommend people read this book. It builds on those core concepts but takes them up a level into application
  architectural patterns including DDD and the Domain Model, CQRS, Event Sourcing and more.

* [Building Microservices](http://shop.oreilly.com/product/0636920033158.do) - After reading the previous two books I
  highly recommend folks read this one, as it further builds on those concepts.

* [Pattern: Backends for Frontends](http://samnewman.io/patterns/architectural/bff/) - BFF is a key architectural
  pattern called out in Building Microservices and one that I reference often in designing applications, especially ones
  with multiple clients.

* [PowerShell Practice and Style](https://github.com/PoshCode/PowerShellPracticeAndStyle) - I looked around for a long
  time on good conventions for writing PowerShell and came across this from the community. I follow these rules about
  95-98% of the time, though Microsoft themselves will have slightly different practices -- what I wind up doing is
  following convention based on the project, so that at least within a given project things are consistent. Common
  things that vary per project are, brackets opening on the same line and the use of backticks.

* [Getting Started with PowerShell Desired State Configuration (DSC)](
  https://mva.microsoft.com/en-US/training-courses/getting-started-with-powershell-desired-state-configuration-dsc-8672) -
  A great course for PowerShell DSC and PowerShell in general.

* [Advanced PowerShell Desired State Configuration (DSC) and Custom Resources](
  https://mva.microsoft.com/en-US/training-courses/advanced-powershell-desired-state-configuration-dsc-and-custom-resources-8702) -
  Another great course to get deeper on PowerShell DSC and PowerShell in general.

* [The DSC Book by Don Jones et al.](https://leanpub.com/the-dsc-book) - A good evergreen book on PowerShell Desired
  State Configuration that continues to be updated. This book helps to fill in a lot of gaps an answer a lot of the
  niche questions about PowerShell DSC.

* [The Imposter's Handbook](https://www.bigmachine.io/products/the-imposters-handbook) - A great read for someone like
  myself who did not get a computer science major in undergrad.

* [The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win](https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592) - A necessary read for any DevOps
  practitioner.

* [Scaling Git (and some back story)](https://blogs.msdn.microsoft.com/bharry/2017/02/03/scaling-git-and-some-back-story/) - I refer to this seminal blog
  post by Brian Harry quite often, as it goes into great depth on how a large company like Microsoft standardized around
  common engineering standards with Git and VSTS (now Azure DevOps).

* [Pro Git](https://git-scm.com/book/en/v2) - aka the Git Book. You only need to know a handful of commands to get going
  as a normal Git user, but if you really want to understand the full breadth of the tool you need to read this book.

* [OpenID Connect Specifications](https://openid.net/specs/openid-connect-core-1_0.html) - and
  [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) and [JWT](https://datatracker.ietf.org/doc/html/rfc7519)
  and [related OpenID Connect specifications](https://openid.net/developers/specs/). (Yes, I really read all of these.)
  Few things have influenced my career in a positive way than reading these specs, because no matter what you are
  working on, two things hold true: you are communicating over a network, and you need to authenticate over that
  network. Thus, this to me was a very critical read to inform on how I can use and design systems and services in a
  proper way with proper authentication and authorization. These specs are widespread, but not well understood, so if
  you want to do yourself a favor and accelerate your career and enhance your systems design approaches, read these
  specs. (As an aside, when I read these in the ~2016 time frame, there weren't many great trainings available on the
  subject, so I had to go to the source.)

* [Mastering Regular Expressions](http://shop.oreilly.com/product/9780596528126.do) - No, I have not mastered them, they
  are still hard. But, I at least have a better idea around DFA's and NFA's and how the different engines work having
  read this book.

* [Zero Trust Networks](http://shop.oreilly.com/product/0636920052265.do) - This book takes your traditional concepts of
  network security and flips them on their head, and presents a model of what modern identity and trust-based security
  looks like.

* [Fearless Salary Negotiation: A Step-By-step Guide to Getting Paid What You're Worth](https://fearlesssalarynegotiation.com/) - If you ever find yourself in the situation where you're interviewing for a
  new job, this is an excellent reference not only for negotiating salary, but for navigating the entire interview
  process.

* [Mastering Business Email: How to write emails that get read](https://masteringbusinessemail.com/) - This is a great
  read to get you thinking about how to write effective emails.

* [Learn SQL Server in a Month of Lunches](https://www.manning.com/books/learn-sql-server-administration-in-a-month-of-lunches) -
  A good, no-nonsense introduction to managing SQL Server.

* [Learn Active Directory in a Month of Lunches](https://www.manning.com/books/learn-active-directory-management-in-a-month-of-lunches) -
  A great book to round out your knowledge of Active Directory.

* [Learn Windows IIS in a Month of Lunches](https://www.manning.com/books/learn-windows-iis-in-a-month-of-lunches) -
  A great book to round out your knowledge of IIS.

* [Learn Windows PowerShell in a Month of Lunches (Third Edition, 2017 or newer)](https://www.manning.com/books/learn-windows-powershell-in-a-month-of-lunches-third-edition) - I was fairly deep on
  PowerShell by the time I started to pick up the PowerShell series of "Lunches" books, but I wanted to start with the
  first introductory one to round out any aspects I may have missed, and understand if it was a good intro book to
  recommend to others (and it is).

* [Learn PowerShell Scripting in a Month of Lunches (First Edition, 2017 or newer)](https://www.manning.com/books/learn-powershell-scripting-in-a-month-of-lunches) - The next logical book in the
  PowerShell "Lunches" books was a good insight into creating maintainable PowerShell scripts. I frame these scripts as
  useful pieces of long-lived business logic that could be packaged up and distributed as single Script modules (e.g.
  `Install-Script`).

* [Learn PowerShell Toolmaking in a Month of Lunches (First Edition, 2013 or newer)](https://www.manning.com/books/learn-powershell-toolmaking-in-a-month-of-lunches) - The next logical book in the
  PowerShell "Lunches" books was a good insight into creating PowerShell modules, including facets of cmdlet design. I
  frame these modules as useful collections of related and cohesive commands that could be packaged up and distributed
  as cmdlet modules (e.g. `Install-Module`). (Not to be confused with compiled, C# binary cmdlet modules.)

* [The PowerShell Scripting & Toolmaking Book (Leanpub evergreen book, limited print runs)](https://leanpub.com/powershell-scripting-toolmaking) - This is an evergreen, logical continuation of the PowerShell
  "Lunches" books with additional advanced content.

* [The Release Pipeline Model](https://docs.microsoft.com/en-us/powershell/dsc/whitepapers) - This is a seminal
  whitepaper that outlines a Release Pipeline Model that's especially oriented around Infrastructure / Configuration as
  Code, using tools like PowerShell DSC and Chef.

* [The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/) - The logical successor to The Phoenix
  Project, but more of a straight-forward handbook instead of a novel.

* [Learning the bash Shell: Unix Shell Programming](https://www.amazon.com/Learning-bash-Shell-Programming-Nutshell-ebook/dp/B0043GXMSY) - I'm not going to lie, bash is
  arcane at times, but this book finally got me a semi-competent understanding of the bash shell (and its siblings ksh,
  zsh, fish etc.).

* [Applied Cryptography: Protocols, Algorithms, and Source Code in C](https://www.amazon.com/Applied-Cryptography-Protocols-Algorithms-Source/dp/0471117099) - This book is a great primer
  on wrapping your head around the underpinnings of how cryptography works. Reading the entirety is not necessary, as
  many of the described algorithms in the book have gone by the wayside over the years since it was written in the 90's,
  but there are a number there that help to establish a good footing for future cryptographic study and application.

* [Effective Monitoring and Alerting: For Web Operations](https://www.amazon.com/Effective-Monitoring-Alerting-Web-Operations/dp/1449333524) - This book starts out with
  slightly run-of-the-mill content on Monitoring and Alerting, and then you get to Chapter 4 and it picks up. This book
  is not just filled with knowledge on monitoring and alerting at scale, it is also filled with *wisdom*. Real world
  experience with these scenarios can be hard to come by. Systems that start small at some point suddenly find
  themselves in need of scale, and montioring and alerting has to scale with it. This book demystifies how to do this
  with tons of rules of thumb that are born out of tried and tested patterns.

* [Scrum: The Art of Doing Twice the Work in Half the Time](https://www.scruminc.com/new-scrum-the-book/) - I'm very
  much into going to the source for the best information, and when I found out from a colleague that there was a book by
  the creator of Scrum about Scrum, I knew I had to read it. Many organizations will take Scrum and transmogrify it
  according to their interpretations (which is fine), but IMHO it's best to build up one's own understanding of Scrum
  from the source, and I think this is the closest you'll get to that source.

* [The Pester Book](https://leanpub.com/pesterbook) - I had this in my queue for a while and finally got around to
  reading it when we started using Pester for various scenarios at work. It's really the best dive into how to use it
  short of perhaps watching Pluralsight videos by the author.

* [Effective C#: 50 Specific Ways to Improve Your C#](http://www.thebillwagner.com/Resources/EffectiveCS) - There are
   some real gems in this book to pick up. Not all of these 50 will be mind-blowing but there's enough here that it goes
  on the recommended list.

* [More Effective C#: 50 Specific Ways to Improve your C#](http://thebillwagner.com/resources/moreeffectivecs) - Similar
  to the first Effective C# book, there are some items in here that are very helpful.

* [Just for Fun: The Story of an Accidental Revolutionary](https://www.harpercollins.com/9780066620732/just-for-fun/) -
  This book won't change the way you program or add large hidden facet of technical understanding to your repertoire,
  but it is still very interesting nonetheless. The autobiography of Linus Torvalds provides some very interesting
  insights into the history of the various operating systems of the time. One interesting concept I appreciated was his
  description of how the basic sys calls serve as the basic building blocks upon which you can do everything else in the
  OS, and how this idea of composability of simple things to make complex things is very important.

* [Instructional Design for Mortals: Creating Better Adult Learning](https://www.amazon.sg/Instructional-Design-Mortals-Creating-Learning/dp/1983165867) -
  Was once in print but hard to find now, but if you can get a copy I highly recommend this. It walks through the various
  levels of learning and how to design instructional material for professional adults in the working world.

* [DNS and BIND](http://shop.oreilly.com/product/9780596100575.do) - I'm not going to lie, this book is a long slog. But
  if you can power through it, you will come out the other end with a much better understanding of the underpinnings of
  DNS, and have a new appreciation of just how much hidden complexity exists beneath a system that has the seemingly
  simplistic job of mapping domain names to IP addresses.

* [The Laws of Identity](https://www.identityblog.com/?p=352) - These laws from Kim Cameron are a foundational and
  seminal read for anyone doing any type of work in the identity and access management space in technology.

* [The Twelve-Factor App](https://12factor.net/) - Regularly referenced work with a number of ideal practices for app
  development.

* [Semantic Versioning](https://semver.org) - I debated adding this to the list but decided that I should, as I feel
  that the concepts expressed here are extremely important and should be understood broadly by developers, especially in
  the context of separating "marketing versions" of software and packages from their actual package versions.

* [Learn Docker in a Month of Lunches](https://www.manning.com/books/learn-docker-in-a-month-of-lunches) - I tried one
  Docker book prior to this and wound up going back for another since it seemed to be missing some key concepts. This
  was the book that solidified my knowledge base for Docker.

* [Learn Kubernetes in a Month of Lunches](https://www.manning.com/books/learn-kubernetes-in-a-month-of-lunches) - This
  is a great book to get you thinking about Kubernetes, and by the end of it you learn about a key concept called the
  Operator Pattern which is the foundation for the service mesh frameworks like Istio and Open Service Mesh, as well as
  new emergent patterns for running stateful workloads on Kubernetes.

* [API by Design](https://apibydesign.com/) - A fantastic read from a former colleague that will get you thinking about
  API complexity and entropy and how to manage it to create quality APIs.

* [OpenAPI](https://www.openapis.org) - The OpenAPI spec has become one of the most important aspects of modern API
  development.

* [JSONSchema](https://json-schema.org/) - This has become a very popular approach to validating JSON in many types of
  systems.

* [Collection+JSON](https://github.com/collection-json/spec) - This is an interesting concept, and while I haven't run
  into a use cases for it much, it's a good concept to keep in mind.

* [RESTful JSON](https://restfuljson.org/) - An approach to including URLs in JSON in an effort to lower the barrier to
  implement hypermedia approaches in APIs.

* [Shell of an Idea](https://leanpub.com/shell-of-an-idea) - A great book on the origins and design philosophy behind
  the PowerShell language and ecosystem.

* [Staff Engineer: Leadership beyond the management track](https://staffeng.com/book) - This is an essential book for
  those who are looking to go to or are at the level of Staff Engineer at their respective company.

* [An Elegant Puzzle: Systems of Engineering Management](https://lethain.com/elegant-puzzle/) - This is another
  essential book for both aspiring and current Staff Engineers as well as Engineering Managers, as it provides good
  perspective from your manager's point of view for the former, as well as lots of helpful tools for both Staff
  Engineers and Managers for navigating organizational challenges and working with senior leadership at your company.

* [The Art of Leadership: Small Things, Done Well](https://www.amazon.com/dp/1492045691) - I really enjoyed going
  through Michael Lopp's 30 things in this book, and the way it's laid out. Leadership can come from anywhere, and
  because of that, whether you are in management or not, I strongly implore you to read this one.

* [Managing Humans: More Biting and Humorous Tales of a Software Engineering Manager](https://www.amazon.com/dp/1484271157/) -
  Another good read from Michael Lopp that has yet more expanded advice on engineering management and leading at
  organizations.

* [Being Geek: The Software Developer's Career Handbook](https://www.amazon.com/dp/0596155409) - Another good read from
  Michael Lopp, this one being slightly less engineering management focused and speaking more directly to the individual
  contributor.

* [Get to the Point!: Sharpen Your Message and Make Your Words Matter](https://www.amazon.com/dp/1523094117) - While not
  strictly a "tech" book, this is still a very good read for people in tech (and all) industries, because no matter
  where you work, you're going to have to present at some point, and you want to be able to deliver a clear message to
  your audience. This is a fun short read with lots of great tips around this.

* [Team Topologies: Organizing Business and Technology Teams for Fast Flow](https://teamtopologies.com/book) - A very
  great book for not just managers but anyone who wants to understand how to align teams in ways to help organizations
  deliver. I personally resonated with a lot of the items around SRE and DevOps and Platform teams, and more.

* [Project Zero Trust: A Story about a Strategy for Aligning Security and the Business](https://www.amazon.com/dp/1119884845) -
  This book is goofy at times and is not on the same story level as Phoenix Project, but nonetheless walks through a
  number of key concepts when trying to pursue a Zero Trust Architecture at any organization.

* [Working in Public: The Making and Maintenance of Open Source Software](https://www.amazon.com/dp/0578675862) -
  This is a fascinating deep dive into everything that goes into creating and, critically, maintaining open source
  software, with a special takeaway on the economics of how a finite amount of attention plays into how maintainers
  approach the care and feeding of their open source projects.

* [Fundamentals of Data Engineering](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/) - This
  book provided a great and relatively recent overview of the landscape of data engineering, covering generation and
  storage through ingestion and storage, transformation and serving, and many surrounding aspects like security and
  data management and more. I highly recommend this read for those looking to get into the field, which is a very
  important one as an upstream facilitator for AI/ML initiatives.

* [The Engineering Executive's Primer: Impactful Technical Leadership](
  https://www.oreilly.com/library/view/the-engineering-executives/9781098149475/) - This is another wonderful book from
  Will Larson that is a natural follow-up to his previous books Staff Engineer and Elegant Puzzle, which covers many
  practical approaches and sets of guidance for operating as an engineering executive.

* [Data Mesh: Delivering Data-Driven Value at Scale](https://www.amazon.com/gp/product/1492092398) - I really
  appreciated this book that walks through the principles and approaches to Data Mesh from the person who coined the
  concept itself. It goes much deeper than online sources and I appreciated the insights and real world tips throughout.

* [Solving the Bottom Turtle — a SPIFFE Way to Establish Trust in Your Infrastructure via Universal Identity](
  https://spiffe.io/pdf/Solving-the-bottom-turtle-SPIFFE-SPIRE-Book.pdf) - For several years during my career focusing
  on Identity, I from time to time had to field questions about automated password / credential rotation. I ran into the
  same realities as the authors of the SPIFFE standard and SPIRE implementation, in that the only way to accomplish
  automated credential rotation with traditional means was to introduce yet _another_ credential to rotate the initial
  credential (or perhaps several initial credentials), and then you have to worry about protecting that credential which
  effectively "owns" those other credential(s), and worry about rotating that credential, too. It becomes "turtles all
  the way down." This is why SPIFFE and its implementation SPIRE resonate very strongly with me. Efforts at several
  large tech companies led to the development of a common standard that uses attestations about the hosting environment
  to derive workload identity and further, enable cryptographic authentication based purely on that identity without the
  need of managing static credentials, which finally solves for the "bottom turtle" credential and opens up new, better
  possibilities for managing service identity at scale.

* [Deep Learning - Foundations and Concepts](https://www.bishopbook.com/) - This book is a dense look into the field of
  Deep Learning and it pulls no punches with regards to the math that is involved behind many of the models we are using
  today. For those looking to get into the theory behind the models, this book will help lay that foundation.

* [Making Friends with Machine Learning](https://www.youtube.com/playlist?list=PLRKtJ4IpxJpDxl0NTvNYQWKCYzHNuy2xG) -
  This is a phenomenal set of talks from Cassie Kozyrkov at Google that slightly pre-date the AI boom, but are
  nonetheless very, very relevant in today's AI/ML world. For someone like me who only got into the AI space recently,
  this set of videos (recommended by a colleague) really helped to lay the foundation for how to go about the
  step-by-step methodology of a machine learning project.

* [Neural networks - 1blue3brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) - This is a
  wonderful series of YouTube videos that depicts visually what is happening inside of today's advanced transformer
  models.

## Other

These are books of any other category that don't fit above.

* [Make Time: How to Focus on What Matters Every Day](https://maketime.blog/) - Great book about how to focus on what
  matters. In particular the advice around how to reduce social media consumption has been great. I've gained a lot of
  cycles back because of techniques in this book.

* [The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing](https://konmari.com/products/the-life-changing-magic-of-tidying-up) -
  Not to be a typical millennial... I first started hearing about Marie Kondo well before her Netflix show, and I would
  highly recommend reading the books to help frame the reasons behind the methods.

* [Spark Joy](https://konmari.com/products/spark-joy) - A great practical guide and addition to Marie's first book above
  for people like me who just never knew how to fold a shirt (or anything) well before. After getting rid of all the
  excess via the KonMari, this comes in very handy for helping to well organize what is important.

* [Measure What Matters: How Google, Bono, and the Gates Foundation Rock the World with OKRs](https://www.whatmatters.com/book) -
  I first encountered this concept when our company was adopting OKRs and this book was a recommended read, and I
  recommend it as well. You'll get the idea early on in the book and much of the latter part dives into specific success
  stories. OKR's can be abused and misused, but regardless it's important to understand the methodology behind them.

* [Building a Second Brain: A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential](https://www.buildingasecondbrain.com/) -
  I read David Allen's classic _Getting Things Done_, and while the ideas put forward in that book still resonate, Tiago
  Forte's approach feels like a much more modern equivalent of that, with the advent of new technologies like
  note-taking apps and the ability to search (whereas Allen's book was written in a paper era). I found the PARA and
  CODE methodologies, and discussions on creativity through divergence and convergence, resonated very strongly with me,
  and as a result I re-organized and re-oriented my note-taking approaches with these practices.

* [Surrounded by Idiots: The Four Types of Human Behavior and How to Effectively Communicate with Each in Business (and in Life)](
  https://www.amazon.com/Surrounded-Idiots-Behavior-Effectively-Communicate/dp/1250179947) - Learning about different
  behavior profiles (red, yellow, green, blue) and how to adapt to them is a very interesting and useful concept that I
  find myself using in day-to-day life now.

* [Outlive: The Science and Art of Longevity](https://peterattiamd.com/outlive/) - Nearing 35 I realized I needed to
  take certain aspects of health more seriously, and Dr. Peter Attia's book helped to frame how I should be looking at
  preventative measures for insulin-related issues, diseases like atherosclerosis, cancer and various dementias, and how
  to take steps with exercise, nutrition and sleep to increase healthspan.
