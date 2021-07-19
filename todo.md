Kleros Integration
1. Test JobForm/ContractForm
    - Make sure schemas valid (can be compiled) and fields required
    - Determine if uuid is necessary or just use Ceramic streamID
    - Make sure forms work properly (state, validity)
    - Clean up submit functions if possible
    - Test submission of TileDocuments to ceramic
2. Ceramic backend work
    - publish and update schemas scripts work
    - TileDocs submitted properly and validly, functioning as a backend db
3. Actual contract deployment
    - functionality for users to actually submit contracts to blockchain (instead of just as data to ceramic) in order to make them enforceable
    - test sc wrapper classes (all methods work)
4. make sure works with kleros centralized arbitrator (for disputes)

