chrome.runtime.sendMessage({ action: "subscriptionsLog" }, function (response) {
  console.log("user subscriptions log response received ....");
  console.log(response);

  if (response.status === "success") {
    const tbody = document.querySelector("#subscriptionTable");
    const dataArray = response.data.subscriptionsData;

    dataArray.forEach((item) => {
      const row = document.createElement("tr");

      const startDateCell = document.createElement("td");
      startDateCell.className = "text-center";
      const dateStart = new Date(item.startDate).toLocaleDateString();
      startDateCell.textContent = dateStart == "1/1/1970" ? "-" : dateStart;
      row.appendChild(startDateCell);

      const endDateCell = document.createElement("td");
      endDateCell.className = "text-center";
      const dateEnd = new Date(item.endDate).toLocaleDateString();
      endDateCell.textContent = dateEnd == "11/16/5138" ? "-" : dateEnd;
      row.appendChild(endDateCell);

      const planNameCell = document.createElement("td");
      planNameCell.className = "text-center";
      planNameCell.textContent = item.plan.name;
      row.appendChild(planNameCell);

      const priceCell = document.createElement("td");
      priceCell.className = "text-center";
      priceCell.textContent = `${item.plan.price} ${
        item.plan.currency === "usd" ? "$" : item.plan.currency
      }`;
      row.appendChild(priceCell);

      tbody.appendChild(row);
    });
  } else {
    // Handle error or empty response
  }
});
