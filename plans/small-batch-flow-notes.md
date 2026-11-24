# Small Batch Flow: research notes

Working notes for `_posts/2026-11-02-small-batch-flow.md`.
Gathered 2026-11-02.
Lives in `plans/` because Jekyll excludes this folder
and the frontmatter check and tag generator scan every `.md` in `_posts/`.

Quotes marked **verified** were read from the primary source.
Quotes marked **unverified** come from a secondary source and need checking before use.

## 1. The lineage, in order

1. **Toyota Production System** (Ohno, postwar Japan): just-in-time, one-piece flow, inventory as waste.
2. **Lean Thinking** (Womack and Jones, 1996): the envelope-stuffing simulation.
3. **Reinertsen, *The Principles of Product Development Flow*** (2009): batch size as an economic trade-off.
4. **Ries, "Work in small batches"** (2009 blog post) and ***The Lean Startup*** (2011): retells the envelope story,
   applies it to startups and continuous deployment.
5. **Flickr "10+ Deploys Per Day"** (Allspaw and Hammond, Velocity 2009): "small frequent changes" as a deploy practice.
6. **Fowler, "FrequencyReducesDifficulty"** (2011): "if it hurts, do it more often."
7. ***The DevOps Handbook*** (2016, 2nd ed. 2021): "Reduce Batch Sizes" as a First Way principle.
8. **Limoncelli, "The Small Batches Principle"** (ACM Queue, 2016).
9. ***Accelerate*** (2018) and **DORA**: deployment frequency as the measurable proxy for batch size.
10. **DORA 2024**: AI adoption correlates with worse stability; hypothesis is that changelists are growing.

## 2. Toyota / TPS

- The Handbook's own TPS illustration (2nd ed., p. 22): stamping large car body panels needs heavy dies
  that take days to set up, so plants stamped as many panels as possible per changeover.
  Large batches then meant "skyrocketing levels of WIP" and, if one panel was bad, "the entire batch has to be scrapped."
  **Verified.**
- Ohno's river metaphor, as the Handbook paraphrases it in a footnote (p. 22):
  "Taiichi Ohno compared enforcing WIP limits to draining water from the river of inventory
  in order to reveal all the problems that obstruct fast flow."
  **Verified as the Handbook's paraphrase.**
  The exact Ohno wording is widely repeated online without a primary citation;
  do not present it as a direct Ohno quote.
- "One-piece flow" and "single-piece flow" are used interchangeably.
  The Handbook footnote (p. 23): "Also known as 'batch size of one' or '1x1 flow,'
  terms that refer to batch size and a WIP limit of one." **Verified.**

## 3. The envelope story (Lean Thinking via Lean Startup)

Source: Ries, "The power of small batches," Startup Lessons Learned, 2011-09-12,
excerpting *The Lean Startup* chapter 9. **Verified against the blog excerpt.**

- Womack and Jones stuffed newsletters with one author's two daughters, ages six and nine.
  The kids proposed batch mode (fold all, then seal all, then stamp all). The father did one envelope at a time.
  They split the pile and raced. The father won.
- Two explanations Ries gives:
  1. Intuition ignores the time spent "sorting, stacking, and moving" piles of half-finished envelopes.
  2. Even if per-step times were equal, small batches win on error detection.
     If the letters don't fit the envelopes, batch mode finds out near the end;
     "With small batches, we'd know almost immediately."
- Quotable: "The one envelope at a time approach is a faster way of getting the job done even though it seems inefficient."
- Note: the Lean Startup excerpt says "one envelope at a time" and never uses "single-piece flow" in the body.
- The Handbook's version (p. 23) adds numbers: ten brochures, four steps, ten seconds per step.
  Large batch: first finished envelope at 310 seconds, a folding error surfaces at 200 seconds and all ten get redone.
  Small batch: first envelope at 40 seconds, "eight times faster," and an error costs one brochure. **Verified.**
  The 310:40 ratio is 7.75, so "eight times" is rounded.
  The Handbook credits the figure to Stefan Luyten, "Single Piece Flow," Medium, 2014-08-08.

## 4. Ries on software batches (2009)

Source: "Work in small batches," Startup Lessons Learned, 2009-02-20. **Verified.**

- "Software should be designed, written, and deployed in small batches."
- "The smaller the batch size, the sooner these kinds of errors are caught, and the easier the integration is."
- "When operating with continuous deployment, it's almost impossible to have integration conflicts."
- "Most organizations have their batch size tuned so as to reduce their overhead."
  (His point: teams pick big batches to amortize setup cost, which is the TPS die-changeover logic again.)
- The definition the Handbook quotes (p. 24) is from this post:
  "The batch size is the unit at which work-products move between stages in a development process.
  For software, the easiest batch to see is code.
  Every time an engineer checks in code, they are batching up a certain amount of work."
  The Handbook inserts "[or DevOps]" after "development." **Verified both ends.**

## 5. Reinertsen: batch size is an economic trade-off, not an article of faith

Sources: Lean Magazine interview "Getting flow into your product development" (**verified**);
Steve Smith's review of *The Principles of Product Development Flow* (**secondary**).

- Batch size is "an economic tradeoff between holding cost and transaction cost."
  Transaction cost rises as batches shrink (each batch costs something to process);
  holding cost rises as batches grow (work sits waiting, feedback is delayed).
  Total cost is a U-curve, and the optimum sits at the bottom.
  Reinertsen's principle E6: "Important trade-offs are likely to have U-curve optimizations."
- He contrasts this with "first-generation" lean, which treats "one-piece flow" as "an article of faith."
- The lever is lowering transaction cost so that smaller batches become economical:
  "test process automation has driven down the transaction cost of testing and thereby enabled much smaller batch sizes."
  This is the bridge from TPS to CI/CD: automation is the die-changeover reduction of software.
- Queues "increase cycle time and overhead" and "hurt quality by delaying feedback."
- His cycle-time principle Q14: "Don't control cycle time, control queue size."
  "Cycle time is a trailing indicator; queue size is a leading indicator."
- Useful counterweight for the post: Reinertsen does not say smaller is always better.
  He says product development is biased toward batches that are far too large,
  so in practice shrinking them is almost always the right move,
  but the honest framing is "find the bottom of the U," not "batch size of one."
- The claim that batch size reduction is "the single most powerful lever" circulates online
  but I could not find it in Reinertsen's own words. **Unverified; do not attribute.**

## 6. Little's Law (why WIP and lead time are the same lever)

Source: Wikipedia, "Little's law." **Verified.**

- L = λW. Average items in the system equals arrival rate times average time in the system.
  Proved by John Little, 1961, *Operations Research*.
- Rearranged for a value stream: lead time = WIP / throughput.
  Cutting WIP cuts lead time without anyone working faster.
  Large batches are WIP by definition, which is why the Handbook lists "less WIP" and "faster lead times" together.

## 7. The DevOps Handbook (2nd ed., 2021)

All **verified** against IT Revolution's excerpt PDF (saved in the scratchpad as `DOHB2_Excerpt.pdf`).

- p. 4: "one of the best predictors of short lead times is small batch sizes of work."
- p. 9: "This method succeeds when we work in small batches and build quality into every part of our value stream."
- p. 22: "Another key component to creating smooth and fast flow is performing work in small batch sizes."
- p. 23: "Small batch sizes result in less WIP, faster lead times, faster detection of errors, and less rework."
  (already in the post)
- p. 23: "The theoretical lower limit for batch size is single-piece flow,
  where each operation is performed one unit at a time."
  (cut from the post as redundant with the TPS paragraph)
- p. 24: "the larger the change going into production, the more difficult the production errors are to diagnose and fix,
  and the longer they take to remediate." (in the post)
- p. 24: "The equivalent to single piece flow in the technology value stream is realized with continuous deployment,
  where each change committed to version control is integrated, tested, and deployed into production." (in the post)
- p. 32 (Chapter 2 conclusion): "We do this by making work visible, limiting WIP,
  reducing batch sizes and the number of handoffs,
  continually identifying and evaluating our constraints, and eliminating hardships in our daily work."
- Reader highlights attribute these to later chapters; **unverified**:
  "the smaller the batch size and the closer we are to the theoretical ideal of single-piece flow" (trunk-based development);
  "As deployment batch size grows, so does the risk of unexpected outcomes associated with the change";
  "The principle of small batch sizes also applies to code reviews."

## 8. Flickr and "if it hurts, do it more often"

- Flickr "10+ Deploys Per Day" deck (Allspaw and Hammond, Velocity, June 2009). **Verified via SlideShare text.**
  Slide 14: "But change is the root cause of most outages!"
  Slide 15: "Discourage change in the interests of stability or Allow change to happen as often as it needs to"
  Slide 16: "Lowering risk of change through tools and culture"
  Slide 34: "Small frequent changes"
  Tools: automated infrastructure, shared version control, one step build and deploy,
  feature flags, shared metrics, IRC and IM robots.
  Culture: respect, trust, healthy attitude about failure, avoiding blame.
- Allspaw's "Ops Meta-Metrics" deck (Etsy and Flickr data) plots time-to-recover against change size:
  huge changesets deployed rarely sit at the high end, tiny changesets deployed often at the low end. **Secondary summary.**
- Fowler, "FrequencyReducesDifficulty," bliki, 2011-07-28. **Verified.**
  Three reasons frequency reduces difficulty:
  1. Decomposition: big tasks get harder faster than linearly, but "when broken up into smaller chunks they compose easily."
  2. Feedback: agile practices aim to "increase the frequency with which you get feedback."
  3. Practice: "With any activity, we improve as we do it more often."
  Fowler calls "if it hurts, do it more often" one of his favorite soundbites.
  He popularized it; he did not claim to coin it.

## 9. Limoncelli, "The Small Batches Principle"

Source: ACM Queue vol. 14 no. 2, 2016, also CACM, and chapter 2 of *The Practice of Cloud System Administration*.
Both ACM pages returned 403 today; the Linux.com repost carried the opening. **Partially verified.**

- "it is better to do work in small batches than big leaps."
- "Small batches permit us to deliver results faster, with higher quality and less stress."
- Benefits he lists: faster delivery, higher quality, less stress.
- The article's three IT stories (per its table of contents): an in-house software deployment,
  the Stack Exchange datacenter failover process, and a monitoring project.
  The failover story is the one people cite: a rare, painful failover became routine by doing it often.
  I could not read it today. Check the book chapter before retelling details.
- From his QCon NY slides (**secondary summary**): "if a process/procedure is risky, do it a lot";
  "small batches improves quality and morale"; "If there are bugs, easier to identify source."

## 10. Google's "Small CLs" guidance

Source: Google Engineering Practices, "Small CLs." **Verified.**

- Definition: "one self-contained change."
- "100 lines is usually a reasonable size for a CL, and 1000 lines is usually too large"
- "When in doubt, write CLs that are smaller than you think you need to write."
- "Reviewers rarely complain about getting CLs that are too small."
- "reviewers have discretion to reject your change outright for the sole reason of it being too large."
- Benefits, as headings: reviewed more quickly; reviewed more thoroughly; less likely to introduce bugs;
  less wasted work if rejected; easier to merge; easier to design well; less blocking on reviews; simpler to roll back.
- Large CLs are fine for whole-file deletions and trusted automated refactors.
- File count matters: 200 lines in one file may be fine, spread across 50 files is usually too large.

## 11. The evidence, with caveats

- **SmartBear / Cisco study (2006).** One Cisco team, 50 developers, ten months, 2,500 reviews, 3.2 million lines.
  Defect density found by reviewers dropped sharply past about 200 lines; SmartBear's guidance extends that to 200 to 400.
  **It measured how well reviewers read, not whether big changes ship more bugs.**
  The vendor sells the review tool. The "70 to 90% defect discovery" figure that travels with the 400-line rule has no source.
  (Traced by a dev.to post; secondary.)
- **arXiv 2203.05045, "Do Small Code Changes Merge Faster?"** 100 GitHub projects, 10 languages, 845,316 PRs,
  plus 401,790 Gerrit and Phabricator reviews.
  Finding: "pull request size and composition do not relate to time-to-merge."
  So the "small PRs merge faster" claim is not supported by this data.
  Small PRs are about review quality and risk, not merge speed.
  Useful as an honest caveat.
- **Accelerate (2018).** Deployment frequency is used as the proxy for batch size because software has no visible inventory.
  The line "we settled on deployment frequency as a proxy for batch size, since it is easy to measure
  and typically has low variability" is widely quoted. **Unverified against the book; check before quoting.**

## 12. The AI angle (for the `ai` tag)

- **DORA 2024 report, p. 40.** **Verified against the PDF** (saved in the scratchpad as `dora2024.pdf`).
  "We see that the effect on delivery throughput is small, but likely negative
  (an estimated 1.5% reduction for every 25% increase in AI adoption).
  The negative impact on delivery stability is larger (an estimated 7.2% reduction for every 25% increase in AI adoption)."
  And the hypothesis:
  "the fundamental paradigm shift that AI has produced in terms of respondent productivity and code generation speed
  may have caused the field to forget one of DORA's most basic principles—the importance of small batch sizes.
  That is, since AI allows respondents to produce a much greater amount of code in the same amount of time,
  it is possible, even likely, that changelists are growing in size.
  DORA has consistently shown that larger changes are slower and more prone to creating instability."
- **DORA "Working in small batches" capability page.** **Verified.**
  "Any batch of code that takes longer than a week to complete and check is too big."
  Lists AI as a reason small batches matter more, and warns AI tools tend to produce oversized pull requests.
  Pitfall it names: teams split work small, then regroup it before release,
  which "delays the feedback on whether the changes have defects."
- **Laura Tacho (DX), quoted by InfoQ, Nov 2024:**
  "AI introduces risk, but not because of garbage code [...]
  it's because batch size seems to increase when AI is used in the coding process."
  "And bigger changesets are riskier, something that DORA's research has long supported." **Verified via InfoQ.**
- **Brodzinski, "We 3.5x'd Our Pull Requests with AI," July 2026.** **Verified.**
  Two comparable greenfield projects, one hand-written, one built almost entirely with Claude.
  Average PR size 232 to 817 lines (3.5x); median 66 to 210; 90th percentile 600 to 1,799; largest PR over 30,000 lines.
  One-liner PRs fell from about 1 in 5 to about 1 in 20.
  "The whole class of work items that was easiest to review is at risk of extinction."
  "We will go so much faster, only to go as slow as we did in the past."
  His quality claim leans on the Cisco study, so it inherits that study's caveat.
- **Kim and Yegge, *Vibe Coding* (2025), from the IT Revolution excerpt "The Vibe Coding Loop."** **Verified.**
  "In general, the smaller the steps, the better chance AI has to succeed."
  "Even as AI grows more capable, small steps are always a good idea."
  "the larger the task you have AI take on, the more that can go wrong."
  Ties neatly to the earlier post about the Handbook and Vibe Coding.

## 13. Angles the post could take

- The laundry sign is Little's Law in a hamper: the pile is WIP, and the pile is what makes the chore feel heavy.
- TPS die changeover, Ries's "overhead," and Reinertsen's transaction cost are the same idea three times.
  The fix is the same too: make the per-batch cost cheap (automation, CI, one-step deploy) so small batches become rational.
- Error detection is the underrated half. Speed gets the headline, but "find out at 40 seconds instead of 200" is the part
  that changes behavior, and it is the argument that survives Reinertsen's "not always smaller" caveat.
- AI is the new die-changeover problem in reverse: generation got cheap, so batches grew.
  DORA's own words are that the field may have forgotten its most basic principle.
- Honest caveats worth keeping: small PRs do not merge faster (arXiv); the 400-line rule is about reading, not shipping;
  batch size of one is a limit, not a target.

## 14. Sources

- The DevOps Handbook, 2nd ed. excerpt: <https://itrevolution.com/wp-content/uploads/2022/06/DOHB2_Excerpt.pdf>
- Ries, "Work in small batches" (2009): <https://www.startuplessonslearned.com/2009/02/work-in-small-batches.html>
- Ries, "The power of small batches" (2011): <https://www.startuplessonslearned.com/2011/09/power-of-small-batches.html>
- Reinertsen, Lean Magazine interview: <http://leanmagazine.net/issues/issue-6/getting-flow-into-your-product-development/>
- Smith, Principles of Product Development Flow review: <https://ardalis.com/principles-of-product-development-flow-book-review/>
- Little's law: <https://en.wikipedia.org/wiki/Little%27s_law>
- Flickr "10+ Deploys Per Day" (2009): <https://www.slideshare.net/slideshow/10-deploys-per-day-dev-and-ops-cooperation-at-flickr/1628368>
- Fowler, "FrequencyReducesDifficulty" (2011): <https://martinfowler.com/bliki/FrequencyReducesDifficulty.html>
- Limoncelli, "The Small Batches Principle" (2016): <https://queue.acm.org/detail.cfm?id=2945077>
- Google, "Small CLs": <https://google.github.io/eng-practices/review/developer/small-cls.html>
- 400-line rule traced: <https://dev.to/debtdraft/how-many-lines-should-a-pull-request-be-we-traced-the-400-line-rule-to-its-source-398c>
- "Do Small Code Changes Merge Faster?" (2022): <https://arxiv.org/abs/2203.05045>
- DORA 2024 report PDF: <https://dora.dev/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.pdf>
- DORA, "Working in small batches": <https://dora.dev/capabilities/working-in-small-batches/>
- InfoQ on DORA 2024 (Tacho quote): <https://www.infoq.com/news/2024/11/2024-dora-report/>
- Brodzinski, "We 3.5x'd Our Pull Requests with AI" (2026): <https://brodzinski.com/2026/07/3x-pull-request-size-ai.html>
- Kim and Yegge, "The Vibe Coding Loop" excerpt: <https://itrevolution.com/articles/the-vibe-coding-loop/>
