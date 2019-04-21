App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
  
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);


    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      var accounts = accs;
      var account = accounts[0];
      
      var from_address = document.getElementById("SenderBalance");
      from_address.innerHTML = web3.eth.accounts[0].valueOf(); 

    });


    return App.initContract();
  },

  initContract: function() {
     $.getJSON('SupplyChain.json', function(data) {
        var SupplyChainArtifact = data;
        App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);

        App.contracts.SupplyChain.setProvider(App.web3Provider);
     });

    return App.bindEvents();
  },

  bindEvents: function() {

    $("#supplier-btn").on('click', function(){

      $("#supplier-form").show();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#prove-form").hide();
      $("#certificate-form").hide();

      $("#supplier-btn").addClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#prove-btn").removeClass("active");
      $("#check-btn").removeClass("active");

    });

    $("#manufacturer-btn").on('click', function(){

      $("#supplier-form").hide();
      $("#manufacturer-form").show();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#prove-form").hide();
      $("#certificate-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").addClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#prove-btn").removeClass("active");
      $("#check-btn").removeClass("active");     

    });

    $("#distributor-btn").on('click', function() {
  
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").show();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#prove-form").hide();
      $("#certificate-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").addClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#prove-btn").removeClass("active");
      $("#check-btn").removeClass("active");

    });

    $("#retailer-btn").on('click', function() {
  
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").show();
      $("#enquiry-form").hide();
      $("#prove-form").hide();
      $("#certificate-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").addClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#prove-btn").removeClass("active");
      $("#check-btn").removeClass("active");
     
    });

    $("#enquiry-btn").on('click', function() {

      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").show();
      $("#prove-form").hide();
      $("#certificate-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").addClass("active");
      $("#prove-btn").removeClass("active");
      $("#check-btn").removeClass("active");
     
    });

    $("#prove-btn").on('click', function(){
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#prove-form").show();
      $("#certificate-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#prove-btn").addClass("active");
      $("#check-btn").removeClass("active");
    });

    $("#check-btn").on('click', function(){
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#prove-form").hide();
      $("#certificate-form").show();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#prove-btn").removeClass("active");
      $("#check-btn").addClass("active");
    });



    $("#submit-s").on('click', App.setSupplier);
    $("#submit-m").on('click', App.setManufacturer);
    $("#submit-d").on('click', App.setDistributor);
    $("#submit-r").on('click', App.setRetailer);
    $("#query").on('click', App.query);
    $("#printBlock").on('click', App.printBlk);
    $("#printTransaction").on('click', App.printTrans);
    $("#prove").on('click', App.prove);
    $("#check").on('click', App.check);

  },

  setStatus: function(message, id){
    var status = document.getElementById(id);
    status.innerHTML = message;
  },

  setSupplier: function() {

    var sid = document.getElementById("sid").value;
    var sname = document.getElementById("sname").value;
    var loc = document.getElementById("sloc").value;
    var material = document.getElementById("material").value;
    var contact = parseInt(document.getElementById("scontact").value);
    var exprice = parseInt(document.getElementById("sexprice").value);

    var re = new RegExp("^[ ]*$");
    if (re.test(sid) || re.test(sname) || re.test(loc) || re.test(material) || re.test(contact) || re.test(exprice)) {
      alert("Please input all the data needed!");
      return ;
    }

    var re1 = new RegExp("^[S]\\d+$");
    if (!re1.test(sid)) {
      alert("Please input a valid ID start with S!");
      return ;
    }

    App.setStatus("Initiating transaction... (please wait)", "status1");

    var metaset;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SupplyChain.deployed().then(function(instance) {
        metaset = instance;
        metaset.mat(sid,sname,loc,material,contact,exprice, {from: account, gas:400000});
      }).then(function(){
        App.setStatus("Transaction complete!", "status1");
        $("#supplier-form").hide();
        $("#manufacturer-form").show();

        $("#supplier-btn").removeClass("active");
        $("#manufacturer-btn").addClass("active");
      }).catch(function(e) {
        console.log(e);
        App.setStatus("Error setting value; see log.", "status1");
      });
    });
 
  },

  setManufacturer: function() {

    var mid = document.getElementById("mid").value;
    var mname = document.getElementById("mname").value;
    var mloc = document.getElementById("mloc").value;
    var mproduct = document.getElementById("mproduct").value;
    var mcontact = parseInt(document.getElementById("mcontact").value);
    var mexprice = parseInt(document.getElementById("mexprice").value);

    var re = new RegExp("^[ ]*$");
    if (re.test(mid) || re.test(mname) || re.test(mloc) || re.test(mproduct) || re.test(mcontact) || re.test(mexprice)) {
      alert("Please input all the data needed!");
      return ;
    }

    var re1 = new RegExp("^[M]\\d+$");
    if (!re1.test(mid)) {
      alert("Please input a valid ID start with M!");
      return ;
    }


    App.setStatus("Initiating transaction... (please wait)", "status2");

    var metaset;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SupplyChain.deployed().then(function(instance) {
        metaset = instance;
        metaset.pro(mid,mname,mloc,mproduct,mcontact,mexprice, {from: account, gas:400000});
      }).then(function() {
        App.setStatus("Transaction complete!", "status2");
        $("#manufacturer-form").hide();
        $("#distributor-form").show();

        $("#manufacturer-btn").removeClass("active");
        $("#distributor-btn").addClass("active");
      }).catch(function(e) {
        console.log(e);
        App.setStatus("Error setting value; see log.", "status2");
      });
    });

  },

  setDistributor: function() {

    var did = document.getElementById("did").value;
    var dname = document.getElementById("dname").value;
    var dproduct = document.getElementById("dproduct").value;
    var dcontact = parseInt(document.getElementById("dcontact").value);
    var origin = document.getElementById("origin").value;
    var destination = document.getElementById("destination").value;

    var re = new RegExp("^[ ]*$");
    if (re.test(did) || re.test(dname) || re.test(dproduct) || re.test(dcontact) || re.test(origin) || re.test(destination)) {
      alert("Please input all the data needed!");
      return ;
    }

    var re1 = new RegExp("^[D]\\d+$");
    if (!re1.test(did)) {
      alert("Please input a valid ID start with D!");
      return ;
    }

    App.setStatus("Initiating transaction... (please wait)", "status3");

    var metaset;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SupplyChain.deployed().then(function(instance) {
        metaset = instance;
        metaset.ship_info(did,dname,dproduct,dcontact,origin, destination, {from: account, gas:400000});
      }).then(function() {
        App.setStatus("Transaction complete!", "status3");
        $("#distributor-form").hide();
        $("#retailer-form").show();

        $("#distributor-btn").removeClass("active");
        $("#retailer-btn").addClass("active");
      }).catch(function(e) {
        console.log(e);
        App.setStatus("Error setting value; see log.", "status3");
      });
    });

  },

  setRetailer: function() {

    var rid = document.getElementById("rid").value;
    var rname = document.getElementById("rname").value;
    var rloc = document.getElementById("rloc").value;
    var rproduct = document.getElementById("rproduct").value;
    var rcontact = parseInt(document.getElementById("rcontact").value);
    var rexprice = parseInt(document.getElementById("rexprice").value);

    var re = new RegExp("^[ ]*$");
    if (re.test(rid) || re.test(rname) || re.test(rloc) || re.test(rproduct) || re.test(rcontact) || re.test(rexprice)) {
      alert("Please input all the data needed!");
      return ;
    }

    var re1 = new RegExp("^[R]\\d+$");
    if (!re1.test(rid)) {
      alert("Please input a valid ID start with R!");
      return ;
    }

    App.setStatus("Initiating transaction... (please wait)", "status4");

    var metaset;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SupplyChain.deployed().then(function(instance) {
        metaset = instance;
        metaset.goods( rid,rname,rloc,rproduct,rcontact,rexprice, {from: account,gas:400000});
      }).then(function() {
        App.setStatus("Transaction complete!", "status4");
        $("#retailer-form").hide();
        $("#enquiry-form").show();

        $("#retailer-btn").removeClass("active");
        $("#enquiry-btn").addClass("active");
      }).catch(function(e) {
        console.log(e);
        App.setStatus("Error setting value; see log.", "status4");
      });
    });

  },

  query: function() {

    var id = document.getElementById("id1").value;

    var re = new RegExp("^[MSRD]\\d+$");
    if (!re.test(id)) {
      alert("Please input a valid ID!");
      return ;
    }

    App.setStatus("Initiating transaction... (please wait)", "status5");

    var metaget;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      if (id.startsWith('S')) {
        App.contracts.SupplyChain.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getmat.call(id, {from: account});
        }).then(function(value) {
          App.getinfo(value);
        }).catch(function(e) {
          console.log(e);
          App.setStatus("Error getting value; see log.", "status5");
        });
      } else if (id.startsWith('M')) {
        App.contracts.SupplyChain.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getpro.call(id, {from: account});
        }).then(function(value){
          App.getinfo(value);
        }).catch(function(e) {
          console.log(e);
          App.setStatus("Error getting value; see log.", "status5");
        });
      } else if (id.startsWith('D')) {
        App.contracts.SupplyChain.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getshipinfo.call(id, {from: account});
        }).then(function(value) {

          var str = web3.toAscii(value[1]);
          var span_element2 = document.getElementById("getval2");
          span_element2.innerHTML = str;

          var span_element3 = document.getElementById("getval3");
          str = web3.toAscii(value[4]);
          span_element3.innerHTML = str;  

          var label_element4 = document.getElementById("label4");
          label_element4.innerHTML = "Origin";

          var label_element5 = document.getElementById("label5");
          label_element5.innerHTML = "Destination";
       
          var span_element4 = document.getElementById("getval4");
          str = web3.toAscii(value[2]);
          span_element4.innerHTML = str;

          var span_element5 = document.getElementById("getval5");
          span_element5.innerHTML = value[3].valueOf();

          var span_element6 = document.getElementById("getval6");
          str = web3.toAscii(value[5]);
          span_element6.innerHTML = str;
       
          App.setStatus("Transaction complete!", "status5");
        }).catch(function(e) {
          console.log(e);
          App.setStatus("Error getting value; see log.", "status5");
        });
      } else if (id.startsWith('R')) {
        App.contracts.SupplyChain.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getgoods.call(id, {from: account});
        }).then(function(value) {
          App.getinfo(value);
        }).catch(function(e) {
          console.log(e);
          App.setStatus("Error getting value; see log.", "status5");
        });
      }
    });

  },

  getinfo: function(value) {
    var str = web3.toAscii(value[1]);
    var span_element2 = document.getElementById("getval2");
    span_element2.innerHTML = str;

    var span_element3 = document.getElementById("getval3");
    var str = web3.toAscii(value[2]);
    span_element3.innerHTML = str;  

    var label_element4 = document.getElementById("label4");
    label_element4.innerHTML = "Location";

    var label_element5 = document.getElementById("label5");
    label_element5.innerHTML = "Expected Price";
 
    var str = web3.toAscii(value[3]);
    var span_element4 = document.getElementById("getval4");
    span_element4.innerHTML = str;

    var span_element5 = document.getElementById("getval5");
    str = value[4].valueOf();
    if (str == 0)
      str = ""
    span_element5.innerHTML = str;

    var span_element6 = document.getElementById("getval6");
    str = value[5].valueOf();
    if (str == 0)
      str = ""
    span_element6.innerHTML = str;

    if (str)
      App.setStatus("Transaction complete!", "status5");
    else 
      App.setStatus("No such ID!", "status5");
  },

  prove: function() {

    var lotno = document.getElementById("lotno").value;
    var grade = document.getElementById("grade").value;
    var mrp = document.getElementById("mrp").value;
    var testdate = document.getElementById("testdate").value;
    var expdate = document.getElementById("expdate").value;

    var re = new RegExp("^[ ]*$");
    if (re.test(lotno) || re.test(grade) || re.test(mrp) || re.test(testdate) || re.test(expdate)) {
      alert("Please input all the data needed!");
      return ;
    }

    App.setStatus("Initiating transaction... (please wait)", "status5");

    var metaset;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SupplyChain.deployed().then(function(instance) {
        metaset = instance;
        metaset.quality( lotno,grade,mrp,testdate,expdate, {from: account,gas:400000});
      }).then(function() {
        App.setStatus("Transaction complete!", "status5");
      
        $("#supplier-form").hide();
        $("#manufacturer-form").hide();
        $("#distributor-form").hide();
        $("#retailer-form").hide();
        $("#enquiry-form").show();
        $("#prove-form").hide();

        $("#supplier-btn").removeClass("active");
        $("#manufacturer-btn").removeClass("active");
        $("#distributor-btn").removeClass("active");
        $("#retailer-btn").removeClass("active");
        $("#enquiry-btn").addClass("active");
        $("#prove-btn").removeClass("active");
      }).catch(function(e) {
        console.log(e);
        App.setStatus("Error setting value; see log.", "status5");
      });
    });
  
  },

  check: function() {
    var lotno = document.getElementById("lotnum").value;

    var re = new RegExp("^[ ]*$");
    if (re.test(lotno)) {
      alert("Please input a valid LoT No.!");
      return ;
    }

    App.setStatus("Initiating transaction... (please wait)", "status6");

    var metaget;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SupplyChain.deployed().then(function(instance) {
        metaget = instance;
        return metaget.getcert.call(lotno, {from: account});
      }).then(function(value) {
        var str = web3.toAscii(value[0]);
        if (!str) {
          console.log("NO SUCH LoT No.!");
          App.setStatus("Error occurred; see log.", "status6");
          return;
        }
        var span_element1 = document.getElementById("cgetval1");
        span_element1.innerHTML = str;

        var span_element2 = document.getElementById("cgetval2");
        str = web3.toAscii(value[1]);
        span_element2.innerHTML = str;  
     
        var span_element3 = document.getElementById("cgetval3");
        span_element3.innerHTML = value[2].valueOf();

        var span_element4 = document.getElementById("cgetval4");
        str = web3.toAscii(value[3]);
        span_element4.innerHTML = str;

        var span_element5 = document.getElementById("cgetval5");
        str = web3.toAscii(value[4]);
        span_element5.innerHTML = str;

        App.setStatus("Transaction complete!", "status6");
      }).catch(function(e) {
        console.log(e);
        App.setStatus("Error occurred; see log.", "status6");
      }); 

    });
  },

  printBlk: function() {
    
    var block = web3.eth.blockNumber;
    console.log("Block number     : " + web3.eth.blockNumber + "\n"
      + " hash            : " + web3.eth.getBlock(block).hash + "\n"
      + " parentHash      : " + web3.eth.getBlock(block).parentHash + "\n"
      + " nonce           : " + web3.eth.getBlock(block).nonce + "\n"
      + " sha3Uncles      : " + web3.eth.getBlock(block).sha3Uncles + "\n"
      + " logsBloom       : " + web3.eth.getBlock(block).logsBloom + "\n"
      + " transactionsRoot: " + web3.eth.getBlock(block).transactionsRoot + "\n"
      + " stateRoot       : " + web3.eth.getBlock(block).stateRoot + "\n"
      + " miner           : " + web3.eth.getBlock(block).miner + "\n"
      + " difficulty      : " + web3.eth.getBlock(block).difficulty + "\n"
      + " totalDifficulty : " + web3.eth.getBlock(block).totalDifficulty + "\n"
      + " extraData       : " + web3.eth.getBlock(block).extraData + "\n"
      + " size            : " + web3.eth.getBlock(block).size + "\n"
      + " gasLimit        : " + web3.eth.getBlock(block).gasLimit + "\n"
      + " gasUsed         : " + web3.eth.getBlock(block).gasUsed + "\n"
      + " timestamp       : " + web3.eth.getBlock(block).timestamp + "\n"
      + " transactions    : " + web3.eth.getBlock(block).transactions + "\n"
      + " uncles          : " + web3.eth.getBlock(block).uncles);
      if (web3.eth.getBlock(block).transactions != null) {
          console.log("--- transactions ---");
          web3.eth.getBlock(block).transactions.forEach( function(e) {
              App.printTrans(e);
          })
      }
      
      var blocknum = document.getElementById("blocknum");
      blocknum.innerHTML = block.valueOf();
  },

  printTrans: function(txHash) {
    
    var txHash = web3.eth.getBlock("latest").transactions[0];
    var tx = web3.eth.getTransaction(txHash);
    
    if (tx != null) {
      console.log("   tx hash         : " + tx.hash + "\n"
        + "   nonce           : " + tx.nonce + "\n"
        + "   blockHash       : " + tx.blockHash + "\n"
        + "   blockNumber     : " + tx.blockNumber + "\n"
        + "   transactionIndex: " + tx.transactionIndex + "\n"
        + "   from            : " + tx.from + "\n" 
        + "   to              : " + tx.to + "\n"
        + "   value           : " + tx.value + "\n"
        + "   gasPrice        : " + tx.gasPrice + "\n"
        + "   gas             : " + tx.gas + "\n"
        + "   input           : " + tx.input);
    }
  },

};

$(function() {
  $(window).load(function() {
    $("#manufacturer-form").hide();
    $("#distributor-form").hide();
    $("#retailer-form").hide();
    $("#enquiry-form").hide();
    $("#prove-form").hide();
    $("#certificate-form").hide();

    App.init();
  });
});

