async function update(ceramic, streamID) {
  const doc = await TileDocument.load(ceramic, streamID);
  await doc.update(newContent);
}

update().catch(console.error);