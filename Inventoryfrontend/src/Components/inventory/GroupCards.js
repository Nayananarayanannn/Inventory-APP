import React from 'react'

function GroupCards({group}) {
  return (
    <div className="groupCard">
      <div class="card">
        <div class="thumbnail">
          <img
            class="left"
            src={group.groupImage}
            alt={group.groupName}
          />
        </div>
        <div class="right">
          <h1>{group.groupName}</h1>
          <div class="separator"></div>
          {group.items?.map((item) => (
            <div class="author">
              <img src={item.image} alt={item.itemName}/>
              <h2>{item.itemName}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupCards