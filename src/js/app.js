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


    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */
     $.getJSON('StructStorage.json', function(data) {
        var StructStorageArtifact = data;
        App.contracts.StructStorage = TruffleContract(StructStorageArtifact);

        App.contracts.StructStorage.setProvider(App.web3Provider);
        // return App.markAdopted();
     });

    return App.bindEvents();
  },

  bindEvents: function() {
    // $(document).on('click', '.btn-adopt', App.handleAdopt);
    $("#supplier-btn").on('click', function(){

      $("#supplier-form").show();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#approve-form").hide();
     
      $("#supplier-btn").addClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#approve-btn").removeClass("active");

    });

    $("#manufacturer-btn").on('click', function(){

      $("#supplier-form").hide();
      $("#manufacturer-form").show();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#approve-form").hide();
     
      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").addClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#approve-btn").removeClass("active");

    });

    $("#distributor-btn").on('click', function() {
  
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").show();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#approve-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").addClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#approve-btn").removeClass("active");

    });

    $("#retailer-btn").on('click', function() {
  
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").show();
      $("#enquiry-form").hide();
      $("#approve-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").addClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#approve-btn").removeClass("active");
     
    });

    $("#enquiry-btn").on('click', function() {

      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").show();
      $("#approve-form").hide();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").addClass("active");
      $("#approve-btn").removeClass("active");
     
    });

    $("#approve-btn").on('click', function(){
      $("#supplier-form").hide();
      $("#manufacturer-form").hide();
      $("#distributor-form").hide();
      $("#retailer-form").hide();
      $("#enquiry-form").hide();
      $("#approve-form").show();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").removeClass("active");
      $("#approve-btn").addClass("active");
    });

    $("#submit-s").on('click', App.setSupplier);
    $("#submit-m").on('click', App.setManufacturer);
    $("#submit-d").on('click', App.setDistributor);
    $("#submit-r").on('click', App.setRetailer);
    $("#query").on('click', App.query);//get
    $("#printBlock").on('click', App.printBlock);
    $("#printTransaction").on('click', App.printTransaction);
    $("#apporve").on('click', App.approve);//setQ

  },

  // markAdopted: function(adopters, account) {
  //   /*
  //    * Replace me...
  //    */ 
  //    var adoptionInstance;

  //    App.contracts.Adoption.deployed().then(function(instance) {
  //       adoptionInstance = instance;
  //       return adoptionInstance.getAdoptors.call();
  //    }).then(function(adoptors) {
  //       for (i = 0; i < adopters.length; i++) {
  //         if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //           $('.panel-pet').eq(i).find('button').text('Success').attr('disable', true);
  //         }
  //       }
  //    }).catch(function(err) {
  //       console.log(err.message);
  //    });

  // },

  // handleAdopt: function(event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));

  //   /*
  //    * Replace me...
  //    */
  //    var adoptionInstance;

  //    web3.eth.getAccounts(function(error, accounts){
  //       if (error) {
  //         console.log(error);
  //       }

  //       var accounts = accounts[0];

  //       App.contracts.Adoption.deployed().then(function(instance) {
  //         adoptionInstance = instance;
  //         return adoptionInstance.adopt(petId, {from: accounts});
  //       }).then(function(result) {
  //         return App.markAdopted();
  //       }).catch(function(err){
  //           console.log(err.message);
  //       });
  //    });
  // }, 


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

    setStatus("Initiating transaction... (please wait)", "status1");

    var metaset;
    App.contracts.StructStorage.deployed().then(function(instance) {
      metaset = instance;
      metaset.mat(sid,sname,loc,material,contact,exprice, {from: account,gas:400000});
    }).then(function(){
      setStatus("Transaction complete!", "status1");
      $("#supplier-form").hide();
      $("#manufacturer-form").show();

      $("#supplier-btn").removeClass("active");
      $("#manufacturer-btn").addClass("active");
    }).catch(function(e) {
      console.log(e);
      setStatus("Error setting value; see log.", "status1");
    });
  },

  setManufacturer: function() {

    var mid = document.getElementById("mid").value;
    var mname = document.getElementById("mname").value;
    var mloc = document.getElementById("mloc").value;
    var mproduct = document.getElementById("mproduct").value;
    var mcontact = parseInt(document.getElementById("mcontact").value);
    var mexprice = parseInt(document.getElementById("mexprice").value);

    setStatus("Initiating transaction... (please wait)", "status2");

    var metaset;
    App.contracts.StructStorage.deployed().then(function(instance) {
      metaset = instance;
      metaset.pro(mid,mname,mloc,mproduct,mcontact,mexprice, {from: account,gas:400000});
    }).then(function() {
      setStatus("Transaction complete!", "status2");
      $("#manufacturer-form").hide();
      $("#distributor-form").show();

      $("#manufacturer-btn").removeClass("active");
      $("#distributor-btn").addClass("active");
    }).catch(function(e) {
      console.log(e);
      setStatus("Error setting value; see log.", "status2");
    });

  },

  setDistributor: function() {

    var did = document.getElementById("did").value;
    var dname = document.getElementById("dname").value;
    var dproduct = document.getElementById("dproduct").value;
    var dcontact = parseInt(document.getElementById("dcontact").value);
    var origin = document.getElementById("origin").value;
    var destination = document.getElementById("destination").value;

    setStatus("Initiating transaction... (please wait)", "status3");

    var metaset;
    App.contracts.StructStorage.deployed().then(function(instance) {
      metaset = instance;
      metaset.ship_info(did,dname,dproduct,dproduct,origin, destination, {from: account,gas:400000});
    }).then(function() {
      setStatus("Transaction complete!", "status3");
      $("#distributor-form").hide();
      $("#retailer-form").show();

      $("#distributor-btn").removeClass("active");
      $("#retailer-btn").addClass("active");
    }).catch(function(e) {
      console.log(e);
      setStatus("Error setting value; see log.", "status3");
    });

  },

  setRetailer: function() {

    var rid = document.getElementById("rid").value;
    var rname = document.getElementById("rname").value;
    var rloc = document.getElementById("rloc").value;
    var rproduct = document.getElementById("rproduct").value;
    var rcontact = parseInt(document.getElementById("rcontact").value);
    var rexprice = parseInt(document.getElementById("rexprice").value);

    setStatus("Initiating transaction... (please wait)", "status4");

    var metaset;
    App.contracts.StructStorage.deployed().then(function(instance) {
      metaset = instance;
      metaset.goods( rid,rname,rloc,rproduct,rcontact,rexprice, {from: account,gas:400000});
    }).then(function() {
      setStatus("Transaction complete!", "status4");
      $("#retailer-form").hide();
      $("#enquiry-form").show();

      $("#retailer-btn").removeClass("active");
      $("#enquiry-btn").addClass("active");
    }).catch(function(e) {
      console.log(e);
      setStatus("Error setting value; see log.", "status4");
    });

  },

  query: function() {

    var id = document.getElementById("id1").value;

    setStatus("Initiating transaction... (please wait)", "status5");

    var metaget;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      if (id.startsWith('S')) {
        App.contracts.StructStorage.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getmat.call(id, {from: account});
        }).then(function(value) {
          var span_element2 = document.getElementById("getval2");
          var str = web3.toAscii(value[1]);
          span_element2.innerHTML = str;

          var span_element3 = document.getElementById("getval3");
          var str = web3.toAscii(value[2]);
          span_element3.innerHTML = str;  
       
          var str = web3.toAscii(value[3]);
          var span_element4 = document.getElementById("getval4");
          span_element4.innerHTML = str;

          var span_element5 = document.getElementById("getval5");
          span_element5.innerHTML = value[4].valueOf();

          var span_element6 = document.getElementById("getval6");
          span_element6.innerHTML = value[5].valueOf();
       
          setStatus("Transaction complete!", "status5");
        }).catch(function(e) {
          console.log(e);
          setStatus("Error getting value; see log.", "status5");
        });
      } else if (id.startsWith('M')) {
        App.contracts.StructStorage.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getpro.call(id, {from: account});
        }).then(function(value) {
          var span_element2 = document.getElementById("getval2");
          var str = web3.toAscii(value[1]);
          span_element2.innerHTML = str;

          var span_element3 = document.getElementById("getval3");
          var str = web3.toAscii(value[2]);
          span_element3.innerHTML = str;  
       
          var str = web3.toAscii(value[3]);
          var span_element4 = document.getElementById("getval4");
          span_element4.innerHTML = str;

          var span_element5 = document.getElementById("getval5");
          span_element5.innerHTML = value[4].valueOf();

          var span_element6 = document.getElementById("getval6");
          span_element6.innerHTML = value[5].valueOf();
       
          setStatus("Transaction complete!", "status5");
        }).catch(function(e) {
          console.log(e);
          setStatus("Error getting value; see log.", "status5");
        });
      } else if (id.startsWith('D')) {
        App.contracts.StructStorage.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getshipinfo.call(id, {from: account});
        }).then(function(value) {
          var label_element4 = document.getElementById("label4");
          var str = web3.toAscii("Origin");
          label_element4.innerHTML = str;

          var label_element5 = document.getElementById("label5");
          str = web3.toAscii("Destination");
          label_element5.innerHTML = str;


          var span_element2 = document.getElementById("getval2");
          str = web3.toAscii(value[1]);
          span_element2.innerHTML = str;

          var span_element3 = document.getElementById("getval3");
          str = web3.toAscii(value[4]);
          span_element3.innerHTML = str;  
       
          var span_element4 = document.getElementById("getval4");
          str = web3.toAscii(value[2]);
          span_element4.innerHTML = str;

          var span_element5 = document.getElementById("getval5");
          span_element5.innerHTML = value[3].valueOf();

          var span_element6 = document.getElementById("getval6");
          span_element6.innerHTML = value[5].valueOf();
       
          setStatus("Transaction complete!", "status5");
        }).catch(function(e) {
          console.log(e);
          setStatus("Error getting value; see log.", "status5");
        });
      } else if (id.startsWith('R')) {
        App.contracts.StructStorage.deployed().then(function(instance) {
          metaget = instance;
          return metaget.getgoods.call(id, {from: account});
        }).then(function(value) {
          var span_element2 = document.getElementById("getval2");
          var str = web3.toAscii(value[1]);
          span_element2.innerHTML = str;

          var span_element3 = document.getElementById("getval3");
          var str = web3.toAscii(value[2]);
          span_element3.innerHTML = str;  
       
          var str = web3.toAscii(value[3]);
          var span_element4 = document.getElementById("getval4");
          span_element4.innerHTML = str;

          var span_element5 = document.getElementById("getval5");
          span_element5.innerHTML = value[4].valueOf();

          var span_element6 = document.getElementById("getval6");
          span_element6.innerHTML = value[5].valueOf();
       
          setStatus("Transaction complete!", "status5");
        }).catch(function(e) {
          console.log(e);
          setStatus("Error getting value; see log.", "status5");
        });
      } else {
        console.log("NO SUCH ID!");
        setStatus("Error getting value; see log.", "status5");
      }
    });

  },

  apporve: function() {

    var lotno = document.getElementById("lotno").value;
    var grade = document.getElementById("grade").value;
    var mrp = document.getElementById("mrp").value;
    var testdate = document.getElementById("testdate").value;
    var expdate = document.getElementById("expdate").value;

    setStatus("Initiating transaction... (please wait)", "status5");

    var metaset;

    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.StructStorage.deployed().then(function(instance) {
        metaset = instance;
        metaset.quality( lotno,grade,mrp,testdate,expdate, {from: account,gas:400000});
      }).then(function() {
        setStatus("Transaction complete!", "status5");
      
        $("#supplier-form").hide();
        $("#manufacturer-form").hide();
        $("#distributor-form").hide();
        $("#retailer-form").hide();
        $("#enquiry-form").show();
        $("#approve-form").hide();

        $("#supplier-btn").removeClass("active");
        $("#manufacturer-btn").removeClass("active");
        $("#distributor-btn").removeClass("active");
        $("#retailer-btn").removeClass("active");
        $("#enquiry-btn").addClass("active");
        $("#approve-btn").removeClass("active");
      }).catch(function(e) {
        console.log(e);
        setStatus("Error setting value; see log.", "status5");
      });
    });

  },

  printBlock: function() {
    
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
              printTransaction(e);
          })
      }
      
      var blocknum = document.getElementById("blocknum");
      blocknum.innerHTML = block.valueOf();
  },

  printTransaction: function(txHash) {
    
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
    App.init();
  });
});
