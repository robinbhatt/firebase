

export function convertSnaps<T>(results){
  // returns us an array of 'Documets Data Objects' from the firebase snapshots passed as arguments
return <T[]> results.docs.map( snap=> { 
  return {
    id: snap.id,
    ...<any>snap.data()
  }
})
      
}