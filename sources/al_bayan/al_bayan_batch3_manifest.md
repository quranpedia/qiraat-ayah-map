# Batch 3 manifest

This batch advances the project by completing the next surah unit in sequence:

1. **Surah work**
   - translated and structured `سورة آل عمران`
   - extracted 7 disagreement items
   - extracted 9 pseudo-`فواصل`
   - normalized a **complete** 200-head `رؤوس الآي` sequence on the later Madani baseline

2. **Witness handling**
   - used the uploaded text witness as the base
   - normalized one compressed head pair
   - recorded page-break corruption instead of silently smoothing it
   - kept the running head sequence distinct from the printed display numerals

## Files in this batch

- `al_bayan_batch3_surah_003_al_imran.json`
- `al_bayan_batch3_surah_003_al_imran.md`
- `al_bayan_batch3_source_issues.json`

## Immediate next best move

Proceed to `سورة النساء`, using the same rule set:
- faithful English translation
- explicit disagreement attribution
- pseudo-`فواصل` extraction
- ordered `رؤوس الآي` sequence with anomaly logging where needed
