---
layout: page
title: Linkfarm

---

# Linkfarm

## Software Engineering and DevOps

I've read more books and articles / seen more videos than this, but these are what I feel to be important and seminal
content that I refer to often. Presented in roughly the order I've read them:

* [Design Patterns](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) - This is a
pretty foundational read, and though there are aspects at times that seem dated, a number of these patterns really stand
the test of time. Moreso, this book engages the mind to start thinking about software in a different way.

* [Scalable and Modular Architecture for CSS](https://smacss.com/) - I searched high and low for patterns for CSS.
There's pretty good prescriptive guidance when it comes to most programming languages, but when it came to a logical
organization pattern for stylesheets I wandered in the desert for a long time. Until I found this book. I have yet to
find a better approach.

* [Smashing Books](https://shop.smashingmagazine.com/collections/books):
[1](https://shop.smashingmagazine.com/products/the-smashing-book-1-digital-edition),
[2](https://shop.smashingmagazine.com/products/smashing-book-2),
[3 + 3 1/3](https://shop.smashingmagazine.com/products/smashing-book-3-digital-edition),
[4](https://shop.smashingmagazine.com/products/smashing-book-4-ebooks),
[5](https://shop.smashingmagazine.com/products/smashing-book-5-real-life-responsive-web-design),
and [more](https://shop.smashingmagazine.com/) - These books have come out at certain intervals over the years, and
although I don't claim to be a Designer of any sort, what I do know about web design has come from these series of
books. Smashing Magazine has also produced other non-numbered books on more specific subjects which are also great.

* [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) - Frontend
development has changed a lot but this book first introduced me to some fundamental concepts including the important AMD
pattern.

* [Microsoft Visual C# Step by Step, 9th Edition](
    https://www.microsoftpressstore.com/store/microsoft-visual-c-sharp-step-by-step-9781509307760) - I read an earlier
edition of this book, but you'll want to get the latest available. It's not exactly an earth-shattering book, but I
decided to retroactively add it to the list, as in hindsight it is a very good book to give to as an introductory book
to the C# language for someone who has not used it before.

* [C# Coding Conventions (C# Programming Guide)](
    https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions) - I'm a big
proponent of "When in Rome, code like the Romans do," i.e. stick to the conventions of the communities surrounding a
given language. These are those conventions for C#.

* [Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/) - Dovetailing off
of C# conventions is overall conventions for library design in conjunction with the .NET Framework.

* [Adaptive Code: Agile coding with design patterns and SOLID principles (2nd Edition) (Developer Best Practices)](
    https://www.amazon.com/Adaptive-Code-principles-Developer-Practices/dp/1509302581/) - This is one of those
unassuming books that winds up being totally earth-shattering. The SOLID principles are so well laid out this book, and
it goes into good depth on a concept that is pretty essential these days: Dependency Injection. And much, much more. I
cannot recommend this book highly enough.

* [Microsoft .NET - Architecting Applications for the Enterprise (2nd Edition) (Developer Reference)](
    https://www.amazon.com/Microsoft-NET-Architecting-Applications-Enterprise/dp/0735685355) - After reading Adaptive
Code, I recommend people read this book. It builds on those core concepts but takes them up a level into application
architectural patterns including DDD and the Domain Model, CQRS, Event Sourcing and more.

* [Building Microservices](http://shop.oreilly.com/product/0636920033158.do) - After reading the previous two books I
highly recommend folks read this one, as it builds on those concepts more. This is another earth-shattering book that
will entirely change how you look at software and deployment and a number of practices.

* [Pattern: Backends for Frontends](http://samnewman.io/patterns/architectural/bff/) - BFF is a key architectural
pattern called out in Building Microservices and one that I reference often in designing applications, especially ones
with multiple clients.

* [PowerShell Practice and Style](https://github.com/PoshCode/PowerShellPracticeAndStyle) - I looked around for a long
time on good conventions for writing PowerShell and came across this from the community. I follow these rules about
95-98% of the time, though Microsoft themselves will have slightly different practices -- what I wind up doing is
following convention based on the project, so that at least within a given project things are consistent. Common things
that vary per project are, brackets opening on the same line and the use of backticks.

* [Getting Started with PowerShell Desired State Configuration (DSC)](
    https://mva.microsoft.com/en-US/training-courses/getting-started-with-powershell-desired-state-configuration-dsc-8672) -
A great course for PowerShell DSC and PowerShell in general -- lots of great tidbits shared throughout by Jeffrey
Snover, the inventor of PowerShell.

* [Advanced PowerShell Desired State Configuration (DSC) and Custom Resources](
    https://mva.microsoft.com/en-US/training-courses/advanced-powershell-desired-state-configuration-dsc-and-custom-resources-8702) -
Another great course to get deeper on PowerShell DSC and PowerShell in general.

* [The DSC Book by Don Jones et al.](https://leanpub.com/the-dsc-book) - A good evergreen book on PowerShell Desired
State Configuration that continues to be updated. This book helps to fill in a lot of gaps an answer a lot of the niche
questions about PowerShell DSC.

* [The Imposter's Handbook](https://www.bigmachine.io/products/the-imposters-handbook) - A great read for someone like
myself who did not get a computer science major in undergrad.

* [The Phoenix Project: A Novel about IT, DevOps, and Helping Your Business Win](
    https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592) - Another earth-shattering book. A
necessary read for any DevOps practitioner.

* [Scaling Git (and some back story)](
    https://blogs.msdn.microsoft.com/bharry/2017/02/03/scaling-git-and-some-back-story/) - I refer to this seminal blog
post by Brian Harry quite often, as it goes into great depth on how a large company like Microsoft standardized around
common engineering standards with Git and VSTS.

* [Pro Git](https://git-scm.com/book/en/v2) - aka the Git Book. You only need to know a handful of commands to get going
as a normal Git user, but if you really want to understand the full breadth of the tool you need to read this book.

* [Mastering Regular Expressions](http://shop.oreilly.com/product/9780596528126.do) - No, I have not mastered them, they
are still hard. But, I at least have a better idea around DFA's and NFA's and how the different engines work having read
this book.

* [Zero Trust Networks](http://shop.oreilly.com/product/0636920052265.do) - This book takes your traditional concepts of
network security and flips them on their head, and presents a model of what modern identity and trust-based security
looks like - an earth-shattering book.

* [Learn SQL Server in a Month of Lunches](
    https://www.manning.com/books/learn-sql-server-administration-in-a-month-of-lunches) -
I began to get into a series of "Month of Lunches book" around certain tools and products I used every day but wanted
to round out my knowledge base on. This was one of them, gives a good, no-nonsense introduction to managing SQL Server.

* [Learn Active Directory in a Month of Lunches](
    https://www.manning.com/books/learn-active-directory-management-in-a-month-of-lunches) -
Similarly I wanted to round out my knowledge in Active Directory and this book was great for that.

* [Learn Windows IIS in a Month of Lunches](https://www.manning.com/books/learn-windows-iis-in-a-month-of-lunches) -
Similarly I wanted to rout out my knowledge of IIS and this book was great for that.

* [Learn Windows PowerShell in a Month of Lunches (Third Edition, 2017 or newer)](
    https://www.manning.com/books/learn-windows-powershell-in-a-month-of-lunches-third-edition) - I was fairly deep on
PowerShell by the time I started to pick up the PowerShell series of "Lunches" books, but I wanted to start with the
first introductory one to round out any aspects I may have missed, and understand if it was a good intro book to
recommend to others (and it is).

* [Learn PowerShell Scripting in a Month of Lunches (First Edition, 2017 or newer)](
    https://www.manning.com/books/learn-powershell-scripting-in-a-month-of-lunches) - The next logical book in the
PowerShell "Lunches" books was a good insight into creating maintainable PowerShell scripts. I frame these scripts as
useful pieces of long-lived business logic that could be packaged up and distributed as single Script modules (e.g.
`Install-Script`).

* [Learn PowerShell Toolmaking in a Month of Lunches (First Edition, 2013 or newer)](
    https://www.manning.com/books/learn-powershell-toolmaking-in-a-month-of-lunches) - The next logical book in the
PowerShell "Lunches" books was a good insight into creating PowerShell modules, including facets of cmdlet design. I
frame these modules as useful collections of related and cohesive commands taht could be packaged up and distributed as
cmdlet modules (e.g. `Install-Module`). (Not to be confused with compiled, C# binary cmdlet modules).

* [The PowerShell Scripting & Toolmaking Book (Leanpub evergreen book, limited print runs)](
    https://leanpub.com/powershell-scripting-toolmaking) - This is an evergreen, logical continuation of the PowerShell
"Lunches" books with additional advanced content.

* [The Release Pipeline Model](https://docs.microsoft.com/en-us/powershell/dsc/whitepapers) - This is a seminal
whitepaper that outlines a Release Pipeline Model that's especially oriented around Infrastructure / Configuration as
Code, using tools like PowerShell DSC and Chef.

* [The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/) - The logical successor to The Phoenix
Project, but more of a straight-forward handbook instead of a novel. We read this book as a team, and I can say
confidently that it goes into the "earth-shattering" category and thus is very worthy of this list.

* [Learning the bash Shell: Unix Shell Programming](
    https://www.amazon.com/Learning-bash-Shell-Programming-Nutshell-ebook/dp/B0043GXMSY) - I'm not going to lie, bash is
arcane, especially coming from PowerShell where everything is beautiful and nothing hurts. And I would probably reach
for Python if I had to do some serious scripting / programing on the *nix side, but alas you do run across the need to
interpret and make bash shell scripts from time to time (if only to wrap / invoke other things) and this book finally
got me a semi-competent understanding of the bash shell (and its siblings ksh, zsh, fish etc.). I'm using zsh most of
the time interactively now with the "oh my zsh" extensions, but writing scripts targeting bash.

* [Applied Cryptography: Protocols, Algorithms, and Source Code in C](
    https://www.amazon.com/Applied-Cryptography-Protocols-Algorithms-Source/dp/0471117099) - This book is a great primer
on wrapping your head around the underpinnings of how cryptography works. Reading the entirety is not necessary, as many
of the described algorithms in the book have gone by the wayside over the years since it was written in the 90's, but
there are a number there that help to establish a good footing for future cryptographic study and application.

* [It Doesn't Have to Be Crazy at Work](https://www.amazon.com/Doesnt-Have-Be-Crazy-Work/dp/0062874780) - This is a very
thought-provoking work that will have you questioning many of the modern-day practices in companies. Overdrawn hours and
unrealistic expectations fly in the face of a lot of the sensible approaches outlined in this book. Highly recommend it.

* [Effective Monitoring and Alerting: For Web Operations](
    https://www.amazon.com/Effective-Monitoring-Alerting-Web-Operations/dp/1449333524) - This book starts out with
slightly run-of-the-mill content on Monitoring and Alerting, and then you get to Chapter 4... and it rocks your socks
off. This book is not just filled with knowledge on monitoring and alerting at scale, it is filled with *wisdom*. Real
world experience with these scenarios can be hard to come by. Systems that start small at some point suddenly find
themselves in need of scale, and montioring and alerting has to scale with it. This book demystifies how to do this with
tons of rules of thumb that are born out of tried and tested patterns. I highly recommend this book.

* [Scrum: The Art of Doing Twice the Work in Half the Time](https://www.scruminc.com/new-scrum-the-book/) - I'm very
much into going to the source for the best information, and when I found out from a colleague that there was a book by
the creator of Scrum about Scrum, I knew I had to read it. Many organizations will take Scrum and transmogrify it
according to their interpretations (which is fine), but IMHO it's best to build up one's own understanding of Scrum from
the source, and I think this is the closest you'll get to that source.

* [The Pester Book](https://leanpub.com/pesterbook) - I had this in my queue for a while and finally got around to
reading it when we started using Pester for various scenarios at work. It's really the best dive into how to use it
short of perhaps watching Pluralsight videos by the author. (I prefer the written word whenever possible.)

* [Effective C#: 50 Specific Ways to Improve Your C#](http://www.thebillwagner.com/Resources/EffectiveCS) - There are
some real gems in this book to pick up. Not all of these 50 will be mind-blowing but there's enough here that it goes
on the recommended list.

* [More Effective C#: 50 Specific Ways to Improve your C#](http://thebillwagner.com/resources/moreeffectivecs) - Similar
to the first Effective C# book, there are some items in here that are very helpful.

* [Just for Fun: The Story of an Accidental Revolutionary](https://www.harpercollins.com/9780066620732/just-for-fun/) -
This book won't change the way you program or add large hidden facet of technical understanding to your repertoire, but
it is still very interesting nonetheless. The autobiography of Linus Torvalds provides some very interesting insights
into the history of the various operating systems of the time. One interesting concept I appreciated was his description
of how the basic sys calls serve as the basic building blocks upon which you can do everything else in the OS, and how
this idea of composability of simple things to make complex things is very important.

* [DNS and BIND](http://shop.oreilly.com/product/9780596100575.do) - I'm not going to lie, this book is a long slog. But
if you can power through it, you will come out the other end with a much better understanding of the underpinnings of
DNS, and have a new appreciation of just how much hidden complexity exists beneath a system that has the seemingly
simplistic job of mapping domain names to IP addresses.

* [Semantic Versioning](https://semver.org/) - I debated adding this to the list but decided that I should, as I feel
that the concepts expressed here are extremely important and should be understood broadly by developers, especially in
the context of separating "marketing versions" of software and packages from their actual package versions.

## Health

Over the course of 2016 and now into 2017 and beyond I started taking health seriously. In particular I lost 40 pounds
eating a well formulated ketogenic diet, which I consider a lifestyle and something I will do forever now. in 2017 I've
also started incorporating the gym into my diet after understanding the strong correlations between overall muscle mass
and longevity.

* [2 Keto Dudes](http://2ketodudes.com/) - This is the podcast that got me started on my keto journey and pursuit of
overall better health. I had listened to Carl Franklin for years on podcast .NET Rocks, and when he mentioned he was
starting a new podcast with his friend Richard Morris to document his journey through Ketosis to fix his Type II
Diabetes, I was intrigued, and knew I could do it, too. And I did. And I'm in the best shape of my life because of it.

* [The Ketogenic Forums](https://www.ketogenicforums.com/) - The dudes, being the software developer types, put their
skills and energy to work to set up these Ketogenic Forums, which is a great source of information for anyone who is
in the ketogenic lifestyle or thinking about starting the ketogenic diet.

* [The 4-Hour Body](http://fourhourbody.com/) - This book can be a little crazy at times, but I have to admit this was
the first place I heard about the concept of low carb and ketosis, and though I didn't understand it years ago when I
first read it, and I don't necessarily follow the "Slow Carb" diet Tim lays out (I stay pretty much low carb *most* of
the time), it has a lot of concepts that were ahead of its time. Still worth a read.

## Other

These are books of any other category that don't fit above.

* [Make Time: How to Focus on What Matters Every Day](https://maketime.blog/) - Great book about how to focus on what
matters. In particular the advice around how to reduce social media consumption has been great. I've gained a lot of
cycles back because of techniques in this book.

* [The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing](
    https://konmari.com/products/the-life-changing-magic-of-tidying-up) - Not to be a typical millenial... I first
started hearing about Marie Kondo well before her Netflix show, and I would highly recommend reading the books to help
frame the reasons behind the methods.

* [Spark Joy](https://konmari.com/products/spark-joy) - A great practical guide and addition to Marie's first book above
for people like me who just never knew how to fold a shirt (or anything) well before. After getting rid of all the
excess this comes in very handy for helping to organize well.

* [Measure What Matters: How Google, Bono, and the Gates Foundation Rock the World with OKRs](
    https://www.whatmatters.com/book) - I first encountered this concept when our company was adopting OKRs and this
book was a recommended read, and I recommend it as well. You'll get the idea early on in the book and much of the latter
part dives into specific success stories.
