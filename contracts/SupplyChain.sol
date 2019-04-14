pragma solidity ^0.5.0;

contract SupplyChain {

    uint public s = 1;
    uint public m = 1;
    uint public d = 1;
    uint public r = 1;
    uint public t = 1;


    struct supplier {
        bytes sid;
        bytes32 sname;
        bytes32 sloc;
        bytes32 material;
        uint scontact;
        uint sexprice;
    }

    struct manufacturer {
       
        bytes mid;
        bytes32 mname;
        bytes32 mloc;
        bytes32 mproduct;
        uint mcontact;
        uint mexprice;
    }

    struct distributor {
       
        bytes did;
        bytes32 dname;
        bytes32 dproduct;
        uint dcontact;
        bytes32 origin;
        bytes32 destination;
    }

    struct retailer {
       
        bytes rid;
        bytes32 rname;
        bytes32 rloc;
        bytes32 rproduct;
        uint rcontact;
        uint rexprice;
    }

    struct lot {

        bytes lotno;
        bytes grade;
        uint mrp;
        bytes32 testdate;
        bytes32 expdate;
    }

    address public tester;
    address owner;

    mapping (bytes => supplier) s1;
    supplier[] public sp;

    mapping (bytes => manufacturer) m1;
    manufacturer[] public mf;

    mapping (bytes => distributor) d1;
    distributor[] public db;

    mapping (bytes => retailer) r1;
    retailer[] public rt;

    mapping (bytes => lot) l1;
    lot[] public l;


    function mat(bytes memory sid, bytes32 sname, bytes32 sloc, bytes32 material, uint scon, uint spr) public {
                   
        SupplyChain.supplier memory snew = supplier(sid, sname, sloc, material, scon, spr);
        s1[sid] = snew;
        sp.push(snew);
        s++;
    }

    function pro(bytes memory mid, bytes32 mname, bytes32 mloc, bytes32 mpro, uint mcon, uint mpr) public {
        
        SupplyChain.manufacturer memory mnew = manufacturer(mid, mname, mloc, mpro, mcon, mpr);
        m1[mid] = mnew;
        mf.push(mnew);
        m++;
    }

    function ship_info(bytes memory did, bytes32 dname, bytes32 dpro, uint dcon, bytes32 org, bytes32 dst) public {
        
        SupplyChain.distributor memory dnew = distributor(did, dname, dpro, dcon, org, dst);
        d1[did] = dnew;
        db.push(dnew);
        ++d;
    }

    function goods(bytes memory rid, bytes32 rname, bytes32 rloc, bytes32 rpro, uint rcon, uint rpr) public {
       
        SupplyChain.retailer memory rnew = retailer(rid, rname, rloc, rpro, rcon, rpr);
        r1[rid] = rnew;
        rt.push(rnew);
        r++;
    }


    function getmat(bytes memory i) public view returns(bytes memory,bytes32,bytes32,bytes32,uint,uint) {
        return (s1[i].sid, s1[i].sname, s1[i].sloc, s1[i].material, s1[i].scontact, s1[i].sexprice);
    }

    function getpro(bytes memory i) public view returns(bytes memory,bytes32,bytes32,bytes32,uint,uint) {
        return (m1[i].mid, m1[i].mname, m1[i].mloc, m1[i].mproduct, m1[i].mcontact, m1[i].mexprice);
    }

    function getshipinfo(bytes memory i) public view returns(bytes memory,bytes32,bytes32,uint,bytes32,bytes32) {
        return (d1[i].did, d1[i].dname, d1[i].dproduct, d1[i].dcontact, d1[i].origin, d1[i].destination);
    }

    function getgoods(bytes memory i) public view returns(bytes memory,bytes32,bytes32,bytes32,uint,uint) {
        return (r1[i].rid, r1[i].rname, r1[i].rloc, r1[i].rproduct, r1[i].rcontact, r1[i].rexprice);
    }


    function quality(bytes memory ll, bytes memory g, uint p, bytes32 tt, bytes32 e) public{
        SupplyChain.lot memory lnew=lot(ll,g,p,tt,e);
        l1[ll]=lnew;
        l.push(lnew);
        t++;
    }

    function getcert(bytes memory k) public view returns(bytes memory,bytes memory,uint,bytes32,bytes32) {
        return(l1[k].lotno, l1[k].grade, l1[k].mrp, l1[k].testdate, l1[k].expdate);
    }
}
