# Security Specification for IQMANIA

## Data Invariants
1. A user can only access, view, and mutate their own profile and assessment records (`users/{userId}/**`).
2. An assessment record cannot be modified once created (immutable assessment audit trail).
3. Public certificates (`public_certificates/{certificateId}`) are readable by anyone for verification, but can only be issued by the authenticated user who completed the test.

## The "Dirty Dozen" Payloads (Denial Tests)
1. Spoofed User Profile: User A attempting to write to `users/{userB}` -> PERMISSION_DENIED.
2. Injected Malicious ID: Writing document with oversized ID (>128 chars) -> PERMISSION_DENIED.
3. Ghost Fields Injection: Attempting to insert arbitrary properties -> PERMISSION_DENIED.
4. Modifying Immutable Assessment: Attempting to update score in `assessments/{id}` -> PERMISSION_DENIED.
5. Cross-User Assessment Write: Setting `userId` to another user in assessment record -> PERMISSION_DENIED.
6. Public Certificate Tampering: Non-authenticated user creating certificate -> PERMISSION_DENIED.
7. Modifying Certificate Score: Updating a created public certificate -> PERMISSION_DENIED.
8. Unauthenticated User Read: Reading private user profile without auth -> PERMISSION_DENIED.
9. Oversized Candidate Name: Name string exceeding max length -> PERMISSION_DENIED.
10. Negative Score Injection: Inserting invalid negative score or percentile -> PERMISSION_DENIED.
11. Blanket Wildcard Write: Attempting to write arbitrary collections -> PERMISSION_DENIED.
12. Unverified Email Spoof: Attempting to hijack user accounts with forged tokens -> PERMISSION_DENIED.
